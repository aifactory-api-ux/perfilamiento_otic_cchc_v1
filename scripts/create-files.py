#!/usr/bin/env python3
"""Project scaffold helper for Perfilamiento OTIC."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path


DEFAULT_FRONTEND_ENV = """REACT_APP_API_BASE_URL=http://localhost:3000
REACT_APP_KEYCLOAK_URL=http://localhost:8080
REACT_APP_KEYCLOAK_REALM=otic
REACT_APP_KEYCLOAK_CLIENT_ID=perfilamiento-frontend
"""


class ScaffoldError(Exception):
    pass


def read_text(path: Path) -> str:
    """Read file content or raise a friendly error."""
    try:
        return path.read_text()
    except FileNotFoundError as exc:
        raise ScaffoldError(f'missing required file: {path}') from exc


def write_text(path: Path, content: str, force: bool) -> None:
    """Write text unless the file exists and force is false."""
    if path.exists() and not force:
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content)


def parse_overrides(items: list[str]) -> dict[str, str]:
    """Parse KEY=VALUE override entries into a dict."""
    overrides: dict[str, str] = {}
    for item in items:
        if '=' not in item:
            raise ScaffoldError(f'invalid override: {item}')
        key, value = item.split('=', 1)
        key = key.strip()
        if not key:
            raise ScaffoldError(f'invalid override: {item}')
        overrides[key] = value.strip()
    return overrides


def build_env(template: str, overrides: dict[str, str]) -> str:
    """Apply overrides to a template env string."""
    output_lines: list[str] = []
    for raw_line in template.splitlines():
        line = raw_line.strip()
        if not line or line.startswith('#') or '=' not in line:
            output_lines.append(raw_line)
            continue
        key, _value = raw_line.split('=', 1)
        key_stripped = key.strip()
        if key_stripped in overrides:
            output_lines.append(f'{key_stripped}={overrides[key_stripped]}')
        else:
            output_lines.append(raw_line)
    for key, value in overrides.items():
        if not any(line.startswith(f'{key}=') for line in output_lines):
            output_lines.append(f'{key}={value}')
    return '
'.join(output_lines) + '
'


def validate_structure(root: Path) -> None:
    """Ensure expected project files are present."""
    required = [
        root / 'backend' / 'package.json',
        root / 'frontend' / 'package.json',
        root / 'backend' / '.env.example',
    ]
    missing = [path for path in required if not path.exists()]
    if missing:
        joined = '
'.join(str(path) for path in missing)
        raise ScaffoldError(f'missing project files:
{joined}')


def create_env_files(root: Path, force: bool, overrides: dict[str, str]) -> list[Path]:
    """Create backend and frontend env files if needed."""
    created: list[Path] = []
    backend_env_example = read_text(root / 'backend' / '.env.example')
    backend_env = build_env(backend_env_example, overrides)
    backend_env_path = root / 'backend' / '.env'
    if force or not backend_env_path.exists():
        write_text(backend_env_path, backend_env, force=True)
        created.append(backend_env_path)

    frontend_env_path = root / 'frontend' / '.env'
    if force or not frontend_env_path.exists():
        write_text(frontend_env_path, DEFAULT_FRONTEND_ENV, force=True)
        created.append(frontend_env_path)

    return created


def parse_args(argv: list[str]) -> argparse.Namespace:
    """Parse CLI arguments."""
    parser = argparse.ArgumentParser(description='Project scaffolding helper')
    parser.add_argument('--root', default='.', help='Project root path')
    parser.add_argument('--force', action='store_true', help='Overwrite existing files')
    parser.add_argument('--set', action='append', default=[], help='Override env values KEY=VALUE')
    parser.add_argument('--check', action='store_true', help='Only validate structure')
    parser.add_argument('--print', dest='print_only', action='store_true', help='Print planned actions')
    return parser.parse_args(argv)


def main(argv: list[str]) -> int:
    """Entry point for CLI usage."""
    args = parse_args(argv)
    root = Path(args.root).resolve()
    try:
        validate_structure(root)
    except ScaffoldError as exc:
        print(str(exc), file=sys.stderr)
        return 1

    if args.check:
        print('structure ok')
        return 0

    try:
        overrides = parse_overrides(args.set)
    except ScaffoldError as exc:
        print(str(exc), file=sys.stderr)
        return 1

    planned = [root / 'backend' / '.env', root / 'frontend' / '.env']
    if args.print_only:
        for path in planned:
            print(str(path))
        return 0

    created = create_env_files(root, args.force, overrides)
    if created:
        print('created:')
        for path in created:
            print(str(path))
    else:
        print('no changes')
    return 0


if __name__ == '__main__':
    raise SystemExit(main(sys.argv[1:]))
