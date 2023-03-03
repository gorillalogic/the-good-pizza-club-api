import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePromotionDto } from '../dtos/create-promotion.dto';
import { Promotion } from '../entities/promotion.entity';
import { ProductService } from './product.service';

@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(Promotion) private repo: Repository<Promotion>,
    private productService: ProductService,
  ) {}

  find() {
    return this.repo.find();
  }

  async create(data: CreatePromotionDto) {
    const product = await this.productService.findOne(data.productId);
    const promotion = this.repo.create(data);
    promotion.product = product;

    return this.repo.save(promotion);
  }

  async findOne(id: number) {
    const promotion = await this.repo.findOneBy({ id });

    if (!promotion) throw new NotFoundException('Product not found');

    return promotion;
  }

  async update(id: number, updates: Partial<Promotion>) {
    let promotion = await this.findOne(id);

    promotion = { ...promotion, ...updates };

    return this.repo.save(promotion);
  }

  async remove(id: number) {
    const promotion = await this.findOne(id);

    return this.repo.remove(promotion);
  }
}
