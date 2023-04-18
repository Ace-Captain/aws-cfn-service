import { IsString } from 'class-validator';

class Spec {
  @IsString()
  template: string;
}

export {
  Spec,
};
