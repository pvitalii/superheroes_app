import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedImages1695048977117 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "image"("superheroId", "url")
        VALUES 
            (1, 'https://wallpapers.com/images/featured/batman-jwwt4ganu79qj9sz.jpg'),
            (1, 'https://hbomax-images.warnermediacdn.com/images/GX8VcRQca5sLDbAEAAAD-/tile?size=640x360&partner=hbomaxcom&v=b04fbb1c44532b9ec9127a54dce0c0af&host=art-gallery.api.hbo.com&language=en-us'),
            (1, 'https://images-na.ssl-images-amazon.com/images/S/pv-target-images/cef73314662f98336f1205e2f096fe782e5c69120763177e78c17834bcf00262._RI_TTW_.jpg'),
            (2, 'https://wallpapers.com/images/featured/spiderman-p4ashmgeamn2mvkn.jpg'),
            (2, 'https://www.wfxrtv.com/wp-content/uploads/sites/20/2022/08/44192f6e99ba496da9b4ef8781f2047c.jpg?w=2560&h=1440&crop=1'),
            (2, 'https://images.thedirect.com/media/article_full/spider-man-2.jpg'),
            (3, 'https://m.media-amazon.com/images/M/MV5BMjAxMDQ1MDE0Ml5BMl5BanBnXkFtZTcwOTc0MTIyMw@@._V1_.jpg'),
            (3, 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2018%2F03%2Fthe-hulk-2000.jpg&q=60'),
            (3, 'https://hips.hearstapps.com/hmg-prod/images/hulk-thor-ragnarok-2-1548346471.jpg?crop=0.670xw:1.00xh;0.0718xw,0&resize=1200:*'),
            (4, 'https://cdn.britannica.com/49/182849-050-4C7FE34F/scene-Iron-Man.jpg'),
            (4, 'https://is5-ssl.mzstatic.com/image/thumb/toO8_a7YKPIpfUgyJ7MnYg/1200x675mf.jpg'),
            (4, 'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/80C64C0B63382CD3ED2653356125F275F63D036028A77D38DC3286AD851A6833/scale?width=506&aspectRatio=2.00&format=jpeg'),
            (5, 'https://s26162.pcdn.co/wp-content/uploads/2023/02/superman.jpeg'),
            (5, 'https://images.thedirect.com/media/article_full/superman-logo.jpg'),
            (5, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQWSvzuvwAyxUDG_sx8srcWfBBYDHpeSxbfw&usqp=CAU'),
            (6, 'https://images.comicbooktreasury.com/wp-content/uploads/2022/08/Captain-America-Steve-Rogers-Reading-Order.jpg'),
            (6, 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/05/26/11/Captain-America-Marvel.jpg?quality=75&width=1200&auto=webp'),
            (6, 'https://i.pinimg.com/originals/31/fc/8f/31fc8f337e4357bf7c754f7b168c3889.jpg'),
            (7, 'https://w7.pngwing.com/pngs/149/950/png-transparent-thor-jane-foster-loki-odin-hulk-thor-comic-marvel-avengers-assemble-superhero-cartoon.png'),
            (7, 'https://i0.wp.com/blog.scoutingmagazine.org/wp-content/uploads/sites/2/2020/03/ThorMarvel-678x381-1.jpg?fit=678%2C381&ssl=1'),
            (7, 'https://www.gamespot.com/a/uploads/scale_landscape/171/1712892/3311332-thor-facebook.jpg');
        `
    );
  }

  public async down(): Promise<void> {}
}
