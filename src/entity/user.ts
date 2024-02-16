import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	first_name: string;

	@Column()
	last_name: string;

	@Column({ type: 'date' })
	birthdate: Date;

	@Column()
	location: string;

	constructor(id: string, name: string, birthdate: Date, location: string) {
		this.id = id;
		this.first_name = name;
		this.last_name = name;
		this.birthdate = birthdate;
		this.location = location;
	}
}
