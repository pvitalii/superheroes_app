import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../common/utils/routes.const';
import { HeroesListPage } from '../../pages/HeroesList/HeroesListPage';
import { AddHeroPage } from '../../pages/AddHero/AddHeroPage';
import { HeroDetailsPage } from '../../pages/HeroDetails/HeroDetailsPage';
import { EditHeroPage } from '../../pages/EditHero/EditHeroPage';

export function Router() {
  return (
    <Routes>
      <Route Component={HeroesListPage} path={ROUTES.ALL_HEROES} />
      <Route Component={HeroDetailsPage} path={ROUTES.HERO_DETAILS} />
      <Route Component={AddHeroPage} path={ROUTES.ADD_HERO} />
      <Route Component={EditHeroPage} path={ROUTES.EDIT_HERO} />
    </Routes>
  );
}
