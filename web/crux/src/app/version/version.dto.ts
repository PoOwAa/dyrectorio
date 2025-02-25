import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsBoolean, IsIn, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { DeploymentWithBasicNodeDto } from '../deploy/deploy.dto'
import { ImageDto } from '../image/image.dto'
import { AuditDto } from '../audit/audit.dto'

export const VERSION_TYPE_VALUES = ['incremental', 'rolling'] as const
export type VersionTypeDto = (typeof VERSION_TYPE_VALUES)[number]

export class BasicVersionDto {
  @IsUUID()
  id: string

  @IsString()
  name: string

  @ApiProperty({ enum: VERSION_TYPE_VALUES })
  @IsIn(VERSION_TYPE_VALUES)
  type: VersionTypeDto
}

export class VersionDto extends BasicVersionDto {
  @Type(() => AuditDto)
  audit: AuditDto

  @IsString()
  @IsOptional()
  changelog?: string

  @IsBoolean()
  default: boolean

  @IsBoolean()
  increasable: boolean
}

export class UpdateVersionDto {
  @IsString()
  name: string

  @IsString()
  @IsOptional()
  changelog?: string
}

export class CreateVersionDto extends UpdateVersionDto {
  @ApiProperty({
    enum: VERSION_TYPE_VALUES,
  })
  @IsString()
  @IsIn(VERSION_TYPE_VALUES)
  type: VersionTypeDto
}

export class IncreaseVersionDto extends UpdateVersionDto {}

export class VersionDetailsDto extends VersionDto {
  @IsBoolean()
  mutable: boolean

  @IsBoolean()
  deletable: boolean

  @Type(() => ImageDto)
  images: ImageDto[]

  deployments: DeploymentWithBasicNodeDto[]
}

export class VersionListQuery {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nameContains?: string
}
