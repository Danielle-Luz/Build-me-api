import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Users {
  @PrimaryGeneratedColumn()
  id;

  @Column({ length: 30, unique: true })
  username;

  @Column({ length: 40 })
  firstName;

  @Column({ length: 50 })
  lastName;

  @Column({ length: 120, unique: true })
  email;

  @Column({ length: 12 })
  password;

  @Column({ name: "github_username", length: 50 })
  githubUsername;

  @Column({ name: "linkedin_url", type: "text" })
  linkedinUrl;
}
