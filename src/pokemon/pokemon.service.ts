import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from './schemas/pokemon.schema';

@Injectable()
export class PokemonService {
  constructor(@InjectModel(Pokemon.name) private pokemonModel: Model<Pokemon>) {}

  async create() {
    for (let i = 900; i < 1026; i++) {
      const pokemon = {
        id: 0,
        name: '',
        description: '',
        height: 0,
        weight: 0,
        abilities: [],
        type: [],
      };

      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      let poke = await response.json();

      pokemon.id = poke.id;
      pokemon.name = poke.name;
      pokemon.height = poke.height;
      pokemon.weight = poke.weight;
      pokemon.abilities = poke.abilities.map((ability) => ability.ability.name);
      pokemon.type = poke.types.map((type) => type.type.name);

      const response2 = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${i}`,
      );
      poke = await response2.json();

      pokemon.description = poke.flavor_text_entries.find((text) => text.language.name === 'en').flavor_text.replace(/\n|\f/g, ' ');

      //console.log(pokemon.description);

      //[0].flavor_text.replace(/\n|\f/g, ' ');

      console.log(await this.pokemonModel.create(pokemon));
    }
    return '';
  }

  findAll(): Promise<Pokemon[]> {
    return this.pokemonModel.find().exec();
  }

  findPokemon(criteria: string): Promise<Pokemon[] | Pokemon> {
    if (isNaN(+criteria)) {
      return this.findByName(criteria);
    } else {
      return this.findById(+criteria);
    }
  }

  findById(id: number): Promise<Pokemon> {
    return this.pokemonModel.findOne({ id: id }).exec();
  }

  findByName(name: string): Promise<Pokemon[]> {
    return this.pokemonModel
      .find({ name: { $regex: '.*' + name + '.*' } })
      .exec();
  }

  searchPokemon(query: {
    type?: string;
    ability?: string;
  }): Promise<Pokemon[]> {
    const and = [];
    if (query.type) {
      const types = query.type.split(',');
      for (const type of types) {
        and.push({ type });
      }
    }

    if (query.ability) {
      and.push({ abilities: query.ability });
    }

    return this.pokemonModel.find({ $and: and }).exec();
  }
}
