import { PageOptionsDto } from "src/common/dto/page-options.dto";
import { StringFieldOptional } from "src/decorators";

export class TransactionCriteriaDto extends PageOptionsDto {
    @StringFieldOptional()
    readonly money_movement?: string;
    @StringFieldOptional()
    readonly tx_period?: string;
    @StringFieldOptional()
    readonly tx_type?: string;
    @StringFieldOptional()
    readonly start_date?: string;
    @StringFieldOptional()
    readonly end_date?: string;
    @StringFieldOptional()
    readonly note?: string;
    @StringFieldOptional()
    readonly category?: string;
}