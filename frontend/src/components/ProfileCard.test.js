/** @jest-environment jsdom */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProfileCard } from "./ProfileCard";

describe("ProfileCard", () => {
  it("renders profile data", () => {
    const profile = {
      id: "1",
      firstName: "Juan",
      lastName: "Perez",
      email: "juan@example.com",
      title: "Analista",
      skills: []
    };

    render(<ProfileCard profile={profile} onSelect={() => {}} />);

    expect(screen.getByText("Juan Perez")).toBeInTheDocument();
    expect(screen.getByText("Analista")).toBeInTheDocument();
  });
});
