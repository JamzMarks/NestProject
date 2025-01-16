import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUserService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUserService = {
      findOne: (id: number) => {
        return Promise.resolve({
          id, 
          email: 'test@mail.com', 
          password: 'asdas'
        } as User)
      },
      find: (email: string) => {
        return Promise.resolve([])
      },
      // remove: () => {
        
      // },
      // update: () => {
        
      // },
    }
    fakeAuthService = {
      // signin: () => {
        
      // },
      // signup: () => {
        
      // }
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUserService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('Should return a user by id', async () => {
    let id = 1
    const result = await fakeUserService.findOne(id);

    expect(result).toEqual({
      id, 
      email: 'test@mail.com', 
      password: 'asdas'
    })
  })
});
