import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

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
        return Promise.resolve([{
          id: 1, 
          email: 'test@mail.com', 
          password: 'asdas'
        } as User])
      },
      // remove: () => {
        
      // },
      // update: () => {
        
      // },
    }
    fakeAuthService = {
      signin: (email: string, password: string) => {
        return Promise.resolve({id: 1, email, password} as User)
      },
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

  describe('Find methods', () => {
    it('Should return a user by id', async () => {
      let id = 1;
      const result = await controller.findOne(id.toString());
  
      expect(result).toEqual({
        id, 
        email: 'test@mail.com', 
        password: 'asdas'
      });
    });
  
    it('findAllUsers should returns a list of existing users with the given email', async () => {
      const users = await controller.findAllUser('test@mail.com');
      expect(users).toHaveLength(1);
      expect(users.some(user => user.email === 'test@mail.com')).toBe(true);
  
    });

    it('Should throw a error if given user id was not found', async () => {
      fakeUserService.findOne = jest.fn(() => null);
      let id = 2;
      await expect(controller.findOne(id.toString())).rejects.toThrow(NotFoundException);
    });
  })
  it('SignIn updates session object and returns user', async () => {
    const session = {userId: 0}
    const user = await controller.signin({email: 'asdas@asdas', password: 'asdasd'},
      session
    );
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  })
});
