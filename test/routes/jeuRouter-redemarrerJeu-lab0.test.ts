// Vous devez insérer les nouveaux tests ici
import { assert } from 'console';
import 'jest-extended';
import supertest from 'supertest'
import 'jest-extended';
import app from '../../src/app';
import { jeuRoutes } from "../../src/routes/jeuRouter";

const request = supertest(app);

beforeAll(async () => {
    await request.post('/api/v1/jeu/demarrerJeu').send({ nom: 'Jean-Marc' });
});

describe('GET /api/v1/jeu/redemarrerJeu', () => {

  it('devrait réussir à redémarrer le jeu (scénario principal)', async () => {
    const response = await request.get('/api/v1/jeu/redemarrerJeu');
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
  });

  it('devrait ne plus rester aucun joueur après redémarrage (postcondition)', async () => {
    const joueursJSON = jeuRoutes.controleurJeu.joueurs;
    const joueursArray = JSON.parse(joueursJSON);
    expect(joueursArray).toBeArrayOfSize(0);
  });

  it("devrait retourner 404 si on essaie de jouer après redémarrage", async () => {
    const response = await request.post('/api/v1/jeu/jouer/');
    expect(response.status).toBe(404);
  });

});