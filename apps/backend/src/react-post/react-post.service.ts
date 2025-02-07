import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostService } from '../post/post.service';
import { UpdateReactPostDto } from './dto/update-react-post.dto';
import { ReactPost } from './entities/react-post.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class ReactPostService {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
    @InjectRepository(ReactPost) private reactPostService: Repository<ReactPost>
  ) {}
  async create(userId: number, postId: number) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new BadRequestException();
    const post = await this.postService.findOne(postId);
    if (!post) throw new BadRequestException();

    const reactPost = await this.reactPostService.findOne({
      where: {
        post: postId,
        user: userId,
      },
    });
    if (!reactPost) {
      const createReactPost = await this.reactPostService.create({
        user: userId,
        post: postId,
        visitDate: new Date(),
      });
      return this.reactPostService.save(createReactPost);
    }
    return this.reactPostService.remove(reactPost);
  }

  async findAll(userId: number) {
    const data = await this.reactPostService.find({
      where: {
        user: userId,
      },
      order: {
        visitDate: 'ASC',
      },
      relations: ['post'],
    });
    return data;
  }

  async findOne(userId: number, postId: number) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new BadRequestException();
    const reactPost = await this.reactPostService.findOne({
      where: {
        post: postId,
        user: userId,
      },
    });
    if (reactPost) return { isActive: true };
    return { isActive: false };
  }

  update(id: number, updateReactPostDto: UpdateReactPostDto) {
    return `This action updates a #${id} reactPost`;
  }

  async remove(id: number) {
    return `${id}`;
  }
}
