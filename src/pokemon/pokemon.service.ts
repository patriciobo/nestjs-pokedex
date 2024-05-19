import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Model, isValidObjectId } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    const pokemon = await this.pokemonModel.create(createPokemonDto);

    return pokemon;
  }

  findAll(paginationDTO: PaginationDto) {
    const { limit = 10, offset /* nro de pagina */ = 0 } = paginationDTO;

    return this.pokemonModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 /* ordenar ascendentemente */ })
      .select('-__v');
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`El id ${id} no es válido`);
    }
    const pokemon: Pokemon = await this.pokemonModel.findById(id);
    if (!pokemon)
      throw new NotFoundException(`No se encontro el pokemon con id ${id}`);
    return pokemon;
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(id);

    if (!pokemon) {
      throw new NotFoundException(`No se encontro el pokemon con id ${id}`);
    }

    await pokemon.updateOne(updatePokemonDto, { new: true });

    return { ...pokemon.toJSON(), ...updatePokemonDto };
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

    if (deletedCount === 0)
      throw new NotFoundException(`Pokemon con id ${id} no se encontro`);

    return;
  }
}
