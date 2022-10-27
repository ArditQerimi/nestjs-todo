import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { SigninDto, SignupDto } from 'src/common/dtos/auth.dto';
import { Repository } from 'typeorm';
import { User } from '../common/entities/user.entity';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  private readonly jwt: JwtService;

  constructor(jwt: JwtService) {
    this.jwt = jwt;
  }

  async signin(user: SigninDto) {
    const { email, password }: SigninDto = user;
    let foundedUser: User = await this.repository.findOne({
      where: { email: email },
    });
    // console.log(foundedUser)
    if (!foundedUser) return null;
    const passwordValid = await bcrypt.compare(password, foundedUser.password);
    if (!foundedUser) {
      throw new NotAcceptableException('could not find the user');
    }

    if (foundedUser && passwordValid) {
      // Return token
      return this.jwt.sign({ id: foundedUser.id, email: foundedUser.email, isAdmin:foundedUser.isAdmin });
    }
    return null;
  }

  async signup(user: SignupDto) {
    const { email, password, isAdmin }: SignupDto = user;

    let foundedUser: User = await this.repository.findOne({
      where: { email: email },
    });


    if (foundedUser) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    foundedUser = new User();

    foundedUser.email = email;

    foundedUser.isAdmin = isAdmin;

    foundedUser.password = encodePassword(password);
    return this.repository.save(foundedUser);
  }

  async getUser(currentUserId: any) {
    let foundedUser: User = await this.repository.findOne({
      where: { id: currentUserId },
    });

    return {
      email: foundedUser.email,
    };
  }

  async getUsers() {
    let users = await this.repository.find();
    return {
      email: users.map((user) => user.email),
    };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    // const user = await this.usersService.findOne(username);
    // if (user && user.password === pass) {
    //   const { password, ...result } = user;
    //   return result;
    // }
    // return null;
  }
}
function encodePassword(password: string): string {
  const salt: string = bcrypt.genSaltSync(10);

  return bcrypt.hashSync(password, salt);
}

function generateToken(user: User): string {
  return this.jwt.sign({ id: user.id, email: user.email });
}
