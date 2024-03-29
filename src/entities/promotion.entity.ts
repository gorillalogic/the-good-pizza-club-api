import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { Record } from './record.entity';

@Entity()
export class Promotion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column({ type: 'float' })
  discount: number;

  @ManyToOne(() => Product, (product) => product.promotions)
  product: Product;

  @ManyToOne(() => Record, (record) => record.promotions)
  size: Record;
}
