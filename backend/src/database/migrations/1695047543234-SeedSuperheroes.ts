import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedSuperheroes1695047543234 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "superhero"("nickname", "real_name", "origin_description", "catch_phrase")
        VALUES 
            ('Batman', 'Bruce Wayne', 'Batman was originally introduced as a ruthless vigilante who frequently killed or maimed criminals, but evolved into a character with a stringent moral code and strong sense of justice', 'The night is darkest just before the dawn. And I promise you, the dawn is coming'),
            ('Spider Man', 'Peter Parker', 'American teenager Peter Parker, a poor sickly orphan, is bitten by a radioactive spider. As a result of the bite, he gains superhuman strength, speed, and agility, along with the ability to cling to walls, turning him into Spider-Man', 'With great power comes great responsibility'),
            ('Hulk', 'Robert Bruce Banner', 'The Hulk is typically seen as a hulking man with green skin, hair, and eyes, wearing only a pair of torn purple pants that survive his physical transformation as the character progressed', 'Whatcha gonna do when Hulkamania Runs Wild on you Brother'),
            ('Iron Man', 'Anthony Edward Stark', 'Iron Man is the superhero persona of Anthony Edward Stark, a businessman and engineer who runs the company Stark Industries. Beginning his career as a weapons manufacturer, he is captured in a war zone, and his heart is severely injured by shrapnel', 'I shouldn’t be alive, unless it was for a reason'),
            ('Superman', 'Clark Kent', 'Superman is the archetype of the superhero: he wears an outlandish costume, uses a codename, and fights evil with the aid of extraordinary abilities', 'This looks like a job for Superman!'),
            ('Captain America', 'Steve Rodgers', 'America’s World War II Super-Soldier continues his fight in the present as an Avenger and untiring sentinel of liberty', 'I can do this all day'),
            ('Thor', 'Thor Odinson', 'Thor is based on the Norse mythological god of the same name. He is the Asgardian god of thunder, whose enchanted hammer Mjolnir enables him to fly and manipulate weather, among his other superhuman attributes', 'I am Thor, son of Odin!');
        `
    );

    await queryRunner.query(
      `INSERT INTO "superhero_superpowers_superpower"("superheroId", "superpowerId")
        VALUES 
            (1, 1),
            (1, 4),
            (1, 6),
            (2, 3),
            (2, 1),
            (2, 5),
            (2, 2),
            (3, 4),
            (3, 5),
            (4, 6),
            (4, 1),
            (5, 5),
            (5, 2),
            (5, 3),
            (6, 1),
            (6, 3),
            (7, 1),
            (7, 2),
            (7, 3),
            (7, 4);
        `
    );
  }

  public async down(): Promise<void> {}
}
