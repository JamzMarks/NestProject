import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService
  let fakeUserService: Partial<UsersService>
  let users: User[];

  beforeEach(async () => {
    users = [];
    fakeUserService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email)
        return Promise.resolve(filteredUsers)
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 9999),
          email,
          password
        } as User;
        users.push(user)
        return Promise.resolve(user)
      }
    };
  
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
      ],
    }).compile();
    service = module.get(AuthService);
  });
  
  it('Can create an instance of auth service', async () => {
    //Create a fake copy of the users service
    expect(service).toBeDefined();
  });

  describe('Auth SignUp', () => {
    it('Shound return new user with salted and hashed password', async () => {
      const [email, password] = ['test@unittest.com', 'passwordtest'];
      const user = await service.signup(email, password);
  
      expect(user.email).toBe(email);
      expect(user.password).toBeDefined();
    });
  
    it('throws an error if user signs up with email that is in use', async () => {
      await service.signup('qual@mail.com', 'somepass');   
      await expect(service.signup('qual@mail.com', 'somepass')).rejects.toThrow(
        BadRequestException
      );
    });
  });
  
  describe('Auth SignIn', () => {
    const [email, password] = ['a@mail.com', 'aaaaaaaa'];

    beforeEach(async () => {
      await service.signup(email, password);
    });

    it('throws if signin is called with an unused email', async () => {
      await expect(service.signin('another@mail.com', password)).rejects.toThrow(NotFoundException);
    });

    it('throws if an invalid password is provided', async () => {
      await expect(service.signin(email, 'another')).rejects.toThrow(BadRequestException);
    });

    it('Should return signin user', async () => { 
      const user = await service.signin(email, password);
      expect(user).toEqual(users[0]);
    });

  }); 
})
