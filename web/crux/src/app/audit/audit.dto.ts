import { Type } from 'class-transformer'
import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator'
import { PaginatedList, PaginationQuery } from 'src/shared/dtos/paginating'

export class AuditDto {
  @Type(() => Date)
  @IsDate()
  createdAt: Date

  @IsUUID()
  createdBy: string

  @Type(() => Date)
  @IsDate()
  updatedAt: Date

  @IsUUID()
  updatedBy: string
}

export class AuditLogQueryDto extends PaginationQuery {
  @IsOptional()
  readonly filter?: string

  @Type(() => Date)
  @IsDate()
  readonly from: Date

  @Type(() => Date)
  @IsDate()
  readonly to: Date
}

export class AuditLogDto {
  @Type(() => Date)
  @IsDate()
  createdAt: Date

  @IsString()
  userId: string

  @IsString()
  email: string

  @IsString()
  serviceCall: string

  @IsOptional()
  data?: object
}

export class AuditLogListDto extends PaginatedList<AuditLogDto> {
  @Type(() => AuditLogDto)
  items: AuditLogDto[]

  total: number
}
