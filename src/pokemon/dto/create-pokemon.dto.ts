export class CreatePokemonDto {
  id: number;
  name: string;
  description: string;
  height: number;
  weight: number;
  abilities: string[];
  type: string[];
}
