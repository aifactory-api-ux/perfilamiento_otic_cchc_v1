import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { IsArray, IsEmail, IsOptional, IsString, IsUUID, Length } from "class-validator";
import { ProfilesService } from "./profiles.service";

class CreateProfileDto {
  @IsString()
  @Length(2, 120)
  firstName: string;

  @IsString()
  @Length(2, 120)
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @Length(2, 120)
  title?: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  bio?: string;

  @IsOptional()
  @IsArray()
  @IsUUID("4", { each: true })
  skillIds?: string[];
}

class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @Length(2, 120)
  firstName?: string;

  @IsOptional()
  @IsString()
  @Length(2, 120)
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(2, 120)
  title?: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  bio?: string;

  @IsOptional()
  @IsArray()
  @IsUUID("4", { each: true })
  skillIds?: string[];
}

@Controller("profiles")
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  findAll() {
    return this.profilesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.profilesService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateProfileDto) {
    return this.profilesService.create(dto);
  }

  @Put(":id")
  update(@Param("id", new ParseUUIDPipe()) id: string, @Body() dto: UpdateProfileDto) {
    return this.profilesService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.profilesService.remove(id);
  }
}
