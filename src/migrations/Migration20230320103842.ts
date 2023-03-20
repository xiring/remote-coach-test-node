import { Migration } from '@mikro-orm/migrations';

export class Migration20230320103842 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user` (`id` varchar(255) not null, `created_at` datetime not null, `updated_at` datetime not null, `is_deleted` tinyint(1) not null default false, `is_permanent` tinyint(1) not null default false, `created_by` varchar(36) null, `updated_by` varchar(36) null, `is_active` tinyint(1) not null default true, `first_name` varchar(255) not null, `middle_name` varchar(255) null, `last_name` varchar(255) not null, `email` varchar(255) not null, `phone_number` varchar(255) not null, `password` varchar(255) not null, `change_password` tinyint(1) null default true, `password_changed_date` datetime null, `last_login_date` datetime null, `refresh_token` text null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists `user`;');
  }

}
