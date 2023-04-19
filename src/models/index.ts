import { IsString } from 'class-validator';

class Metadata {
  @IsString()
  name: string;
}

class Spec {
  @IsString()
  template: string;
  region: string;
}

class UserInput {
  metadata: Metadata;
  spec: Spec;
}

export {
  UserInput,
};
