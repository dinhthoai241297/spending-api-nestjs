import { EOrder } from 'src/constants';
import {
    EnumFieldOptional,
    NumberFieldOptional
} from '../../decorators';

export class PageOptionsDto {
  @EnumFieldOptional(() => EOrder, {
    default: EOrder.ASC,
  })
  readonly order: EOrder = EOrder.ASC;

  @NumberFieldOptional({
    minimum: 0,
    default: 0,
    int: true,
  })
  readonly page: number = 0;

  @NumberFieldOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
    int: true,
  })
  readonly size: number = 10;
}
