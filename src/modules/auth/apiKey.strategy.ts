import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ApiKeyEnum, AuthMethodsEnum, EnvEnum } from '@common';
import Strategy from 'passport-headerapikey';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(
  Strategy,
  AuthMethodsEnum.ApiKey,
) {
  constructor(private readonly configService: ConfigService) {
    super(
      { header: ApiKeyEnum.HeaderName, prefix: '' },
      true,
      async (apiKey: string, done) => {
        return this.validate(apiKey, done);
      },
    );
  }

  // eslint-disable-next-line
  public validate = async (
    apiKey: string,
    done: (error: Error, data) => object,
  ) => {
    if ((await this.configService.get(EnvEnum.API_KEY)) === apiKey) {
      done(null, true);
    }
    done(new UnauthorizedException(), null);
  };
}
