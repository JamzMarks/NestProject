import { UseInterceptors } from "@nestjs/common";
import { SerializeInterceptor } from "src/interceptors/serialize.interceptor";

interface ClassContructor{
    new (...args: any[]): {}
}

export function Serialize(dto: ClassContructor){
    return UseInterceptors(new SerializeInterceptor(dto));
}