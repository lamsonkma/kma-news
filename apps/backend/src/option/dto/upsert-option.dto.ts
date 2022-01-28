import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsDefined } from 'class-validator';
import { OptionType } from '../entities/option.entity';

export class UpsertOptionDto {
  @ApiProperty()
  @IsDefined()
  value: string | any;

  @ApiProperty({ enum: OptionType, default: OptionType.JSON_TEXT })
  @IsEnum(OptionType, { message: 'type must be one of plain_text, json_text' })
  type: OptionType;
}
