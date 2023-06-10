import { Injectable } from '@nestjs/common';
import { Observable, from, of, switchMap } from 'rxjs';
import { BlogEntry } from '../model/blog-entry.interface';
import { User } from 'src/user/models/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntryEntity } from '../model/blog-entry.entity';
import { Repository } from 'typeorm';
import { UserService } from '../../user/service/user.service';
const slugify = require('slugify');

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntryEntity)
    private readonly blogRepository: Repository<BlogEntryEntity>,
    private userService: UserService,
  ) {}

  create(user: User, blogEntry: BlogEntry): Observable<BlogEntry> {
    blogEntry.author = user;
    return this.generateSlug(blogEntry.title).pipe(
      switchMap((slug: string) => {
        blogEntry.slug = slug;
        return from(this.blogRepository.save(blogEntry));
      }),
    );
  }

  generateSlug(title: string): Observable<string> {
    return of(slugify(title));
  }

  findAll(): Observable<BlogEntry[]> {
    return from(this.blogRepository.find({ relations: ['author'] }));
  }

  findOne(id: number): Observable<BlogEntry> {
    return from(
      this.blogRepository.findOne({ where: { id }, relations: ['author'] }),
    );
  }

  updateOne(id: number, blogEntry: BlogEntry): Observable<BlogEntry> {
    return from(this.blogRepository.update(id, blogEntry)).pipe(
      switchMap(() => this.findOne(id)),
    );
  }

  deleteOne(id: number): Observable<any> {
    return from(this.blogRepository.delete(id));
  }
  // findByUser(userId: number): Observable<BlogEntry[]> {
  //   return from(
  //     this.blogRepository.find({
  //       where: {
  //         author: userId,
  //       },
  //       relations: ['author'],
  //     }),
  //   );
  // }
}