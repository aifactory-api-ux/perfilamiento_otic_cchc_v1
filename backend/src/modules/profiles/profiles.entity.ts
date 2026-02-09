import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SkillEntity } from "../skills/skills.entity";

@Entity({ name: "profiles" })
export class ProfileEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 120 })
  firstName: string;

  @Column({ type: "varchar", length: 120 })
  lastName: string;

  @Column({ type: "varchar", length: 200, unique: true })
  email: string;

  @Column({ type: "varchar", length: 120, nullable: true })
  title: string | null;

  @Column({ type: "text", nullable: true })
  bio: string | null;

  @Column({ type: "uuid", nullable: true })
  userId: string | null;

  @ManyToMany(() => SkillEntity, { eager: true })
  @JoinTable({ name: "profile_skills" })
  skills: SkillEntity[];

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}
