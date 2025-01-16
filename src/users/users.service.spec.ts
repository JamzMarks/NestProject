import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Can create an instance of auth service', async () => {
    const module = await Test.createTestingModule({
      providers: [AuthService]
    }).compile();
    const service = module.get(AuthService);

    expect(service).toBeDefined();
  })
});
