import { Controller, Get, Param, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('/add')
  addPokemon() {
    return this.pokemonService.create();
  }

  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get('/search')
  searchPokemon(@Query() query?: { type?: string; ability?: string }) {
    return this.pokemonService.searchPokemon(query);
  }

  @Get(':criteria')
  findPokemon(@Param('criteria') criteria: string) {
    return this.pokemonService.findPokemon(criteria);
  }
}
