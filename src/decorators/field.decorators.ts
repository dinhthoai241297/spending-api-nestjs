/* eslint-disable unicorn/no-null */
import { applyDecorators } from '@nestjs/common';
import { ApiProperty, type ApiPropertyOptions } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsBoolean,
    IsDate, IsEmail, IsEnum, IsInt,
    IsNumber,
    IsPositive,
    IsString, Max,
    MaxLength,
    Min,
    MinLength,
    NotEquals
} from 'class-validator';
import { ApiEnumProperty } from './property.decorators';

import {
    PhoneNumberSerializer,
    ToArray,
    ToBoolean,
    ToLowerCase,
    ToUpperCase
} from './transform.decorators';
import {
    IsNullable, IsPhoneNumber, IsUndefinable
} from './validator.decorators';

interface IFieldOptions {
    each?: boolean;
    swagger?: boolean;
    nullable?: boolean;
    groups?: string[];
}

interface INumberFieldOptions extends IFieldOptions {
    min?: number;
    max?: number;
    int?: boolean;
    isPositive?: boolean;
}

interface IStringFieldOptions extends IFieldOptions {
    minLength?: number;
    maxLength?: number;
    toLowerCase?: boolean;
    toUpperCase?: boolean;
}

type IClassFieldOptions = IFieldOptions;
type IBooleanFieldOptions = IFieldOptions;
type IEnumFieldOptions = IFieldOptions;

export function NumberField(
    options: Omit<ApiPropertyOptions, 'type'> & INumberFieldOptions = {},
): PropertyDecorator {
    const decorators = [Type(() => Number)];

    if (options.nullable) {
        decorators.push(IsNullable({ each: options.each }));
    } else {
        decorators.push(NotEquals(null, { each: options.each }));
    }

    if (options.swagger !== false) {
        decorators.push(ApiProperty({ type: Number, ...options }));
    }

    if (options.each) {
        decorators.push(ToArray());
    }

    if (options.int) {
        decorators.push(IsInt({ each: options.each }));
    } else {
        decorators.push(IsNumber({}, { each: options.each }));
    }

    if (typeof options.min === 'number') {
        decorators.push(Min(options.min, { each: options.each }));
    }

    if (typeof options.max === 'number') {
        decorators.push(Max(options.max, { each: options.each }));
    }

    if (options.isPositive) {
        decorators.push(IsPositive({ each: options.each }));
    }

    return applyDecorators(...decorators);
}

export function NumberFieldOptional(
    options: Omit<ApiPropertyOptions, 'type' | 'required'> &
        INumberFieldOptions = {},
): PropertyDecorator {
    return applyDecorators(
        IsUndefinable(),
        NumberField({ required: false, ...options }),
    );
}

export function StringField(
    options: Omit<ApiPropertyOptions, 'type'> & IStringFieldOptions = {},
): PropertyDecorator {
    const decorators = [Type(() => String), IsString({ each: options.each })];

    if (options.nullable) {
        decorators.push(IsNullable({ each: options.each }));
    } else {
        decorators.push(NotEquals(null, { each: options.each }));
    }

    if (options.swagger !== false) {
        decorators.push(
            ApiProperty({ type: String, ...options, isArray: options.each }),
        );
    }

    const minLength = options.minLength || 1;

    decorators.push(MinLength(minLength, { each: options.each }));

    if (options.maxLength) {
        decorators.push(MaxLength(options.maxLength, { each: options.each }));
    }

    if (options.toLowerCase) {
        decorators.push(ToLowerCase());
    }

    if (options.toUpperCase) {
        decorators.push(ToUpperCase());
    }

    return applyDecorators(...decorators);
}

export function StringFieldOptional(
    options: Omit<ApiPropertyOptions, 'type' | 'required'> &
        IStringFieldOptions = {},
): PropertyDecorator {
    return applyDecorators(
        IsUndefinable(),
        StringField({ required: false, ...options }),
    );
}

export function BooleanField(
    options: Omit<ApiPropertyOptions, 'type'> & IBooleanFieldOptions = {},
): PropertyDecorator {
    const decorators = [ToBoolean(), IsBoolean()];

    if (options.nullable) {
        decorators.push(IsNullable());
    } else {
        decorators.push(NotEquals(null));
    }

    if (options.swagger !== false) {
        decorators.push(ApiProperty({ type: Boolean, ...options }));
    }

    return applyDecorators(...decorators);
}

export function BooleanFieldOptional(
    options: Omit<ApiPropertyOptions, 'type' | 'required'> &
        IBooleanFieldOptions = {},
): PropertyDecorator {
    return applyDecorators(
        IsUndefinable(),
        BooleanField({ required: false, ...options }),
    );
}

export function EmailField(
    options: Omit<ApiPropertyOptions, 'type'> & IStringFieldOptions = {},
): PropertyDecorator {
    const decorators = [
        IsEmail(),
        StringField({ toLowerCase: true, ...options }),
    ];

    if (options.nullable) {
        decorators.push(IsNullable());
    } else {
        decorators.push(NotEquals(null));
    }

    if (options.swagger !== false) {
        decorators.push(ApiProperty({ type: String, ...options }));
    }

    return applyDecorators(...decorators);
}

export function EmailFieldOptional(
    options: Omit<ApiPropertyOptions, 'type'> & IStringFieldOptions = {},
): PropertyDecorator {
    return applyDecorators(
        IsUndefinable(),
        EmailField({ required: false, ...options }),
    );
}

export function PhoneField(
    options: Omit<ApiPropertyOptions, 'type'> & IFieldOptions = {},
): PropertyDecorator {
    const decorators = [IsPhoneNumber(), PhoneNumberSerializer()];

    if (options.nullable) {
        decorators.push(IsNullable());
    } else {
        decorators.push(NotEquals(null));
    }

    if (options.swagger !== false) {
        decorators.push(ApiProperty({ type: String, ...options }));
    }

    return applyDecorators(...decorators);
}

export function PhoneFieldOptional(
    options: Omit<ApiPropertyOptions, 'type' | 'required'> & IFieldOptions = {},
): PropertyDecorator {
    return applyDecorators(
        IsUndefinable(),
        PhoneField({ required: false, ...options }),
    );
}

export function DateField(
    options: Omit<ApiPropertyOptions, 'type'> & IFieldOptions = {},
): PropertyDecorator {
    const decorators = [Type(() => Date), IsDate()];

    if (options.nullable) {
        decorators.push(IsNullable());
    } else {
        decorators.push(NotEquals(null));
    }

    if (options.swagger !== false) {
        decorators.push(ApiProperty({ type: Date, ...options }));
    }

    return applyDecorators(...decorators);
}

export function DateFieldOptional(
    options: Omit<ApiPropertyOptions, 'type' | 'required'> & IFieldOptions = {},
): PropertyDecorator {
    return applyDecorators(
        IsUndefinable(),
        DateField({ ...options, required: false }),
    );
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function EnumField<TEnum extends object>(
    getEnum: () => TEnum,
    options: Omit<ApiPropertyOptions, 'type' | 'enum' | 'enumName' | 'isArray'> &
        IEnumFieldOptions = {},
): PropertyDecorator {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/ban-types
    const enumValue = getEnum();
    const decorators = [IsEnum(enumValue, { each: options.each })];

    if (options.nullable) {
        decorators.push(IsNullable());
    } else {
        decorators.push(NotEquals(null));
    }

    if (options.each) {
        decorators.push(ToArray());
    }

    if (options.swagger !== false) {
        decorators.push(
            ApiEnumProperty(getEnum, { ...options, isArray: options.each }),
        );
    }

    return applyDecorators(...decorators);
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function EnumFieldOptional<TEnum extends object>(
    getEnum: () => TEnum,
    options: Omit<ApiPropertyOptions, 'type' | 'required' | 'enum' | 'enumName'> &
        IEnumFieldOptions = {},
): PropertyDecorator {
    return applyDecorators(
        IsUndefinable(),
        EnumField(getEnum, { required: false, ...options }),
    );
}