import {it,expect} from 'vitest';
import {gameRegistry} from '../../src/games/core/GameRegistry';
import games from '../../../shared/curriculum/telangana/class-8/mathematics/te/games.json';
it('keeps frontend game availability identical to the shared catalog',()=>{expect(gameRegistry).toEqual(games);expect(gameRegistry.filter(g=>g.status==='planned').every(g=>g.route===null)).toBe(true)});
