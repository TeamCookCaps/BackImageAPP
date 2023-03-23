CREATE DATABASE IF NOT EXISTS `capstonedb` DEFAULT CHARACTER SET utf8; 
USE `capstonedb`;

create table User(
	UID varchar(60) not null,
    nick_name varchar(50) not null,
--    password varchar(50),
PRIMARY KEY(UID)
);

create table ImageUrl(
	id int not null,
    url char(120) not null,
    primary key(id)
);

create table ImageInfo(
	id int not null,
    uid varchar(60) not null,
    image_id int not null,
    image_date int not null,
    image_location varchar(120) not null,
    delete_yn char(1) not null default 'N',
    favorite_yn char(1) not null default 'N',
    wallpaper_yn char(1) not null default 'N', 
primary key(id),
foreign key(uid) references user(uid),
foreign key(image_id) references imageurl(id)
);
    
create table CategoryInfo(
	category_name varchar(20) not null,
    bookmark_yn char(1) default 'N',
primary key(category_name)
);

create table ImageCategory(
	category_name varchar(20) not null,
    image_id int not null,
primary key(category_name, image_id),
foreign key(category_name) references CategoryInfo(category_name),
foreign key(image_id) references ImageUrl(id)
);

create table StoryMusic(
	id int not null,
    story_music_url char(255) not null,
primary key(id)
);

create table StoryInfo(
	id int not null,
    story_title varchar(20) not null,
    UUID varchar(60) not null,
    story_url char(255) not null,
    story_music_id int not null,
primary key(id),
foreign key(UUID) references user(UID),
foreign key(story_music_id) references StoryMusic(id)
);

create table ImageStory(
	id int not null,
    imageId int not null,
primary key(id, imageId),
foreign key(id) references StoryInfo(id),
foreign key(imageId) references ImageUrl(id)
);


create table TestTable(
	testId int,
    testPw int,
primary key(testId)
);

insert into TestTable values (1, 100);