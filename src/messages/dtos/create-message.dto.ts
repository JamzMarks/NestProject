import { IsString } from "class-validator"

export class createMessageDto {
    
    @IsString()
    constent: string
}