CREATE DATABASE IF NOT EXISTS `capstonedb` DEFAULT CHARACTER SET utf8; 
USE `capstonedb`;

create table User(
	UID varchar(60) not null,
    nick_name varchar(50) not null,
--    password varchar(50),
PRIMARY KEY(UID)
);

create table ImageInfo(
	id int not null AUTO_INCREMENT,
    uid varchar(60) not null,
    image_url char(200) not null,
    image_date datetime null,
    image_location varchar(120) null,
    image_width int not null,
    image_height int not null,
    delete_yn char(1) not null default 'N',
    wallpaper_yn char(1) not null default 'N', 
    story_yn char(1) not null default 'N',
primary key(id),
foreign key(uid) references user(uid));
    
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
foreign key(image_id) references ImageInfo(id)
on delete cascade
);

/* imageCategory 테이블 외래키 cascade 추가
alter table imagecategory drop constraint imagecategory_ibfk_2;
alter table imagecategory add foreign key(image_id) references imageInfo(id) on delete cascade;
*/

create table Parent_category(
    category_name varchar(20) not null,
    parent_name varchar(20) not null,
primary key(category_name),
foreign key(category_name) references CategoryInfo(category_name),
foreign key(parent_name) references CategoryInfo(category_name)
);

create table Palette(
    image_id int not null,
    r_data int not null,
    g_data int not null,
    b_data int not null,
    rgb_type varchar(8) not null
--primary key(image_id),
--foreign key(image_id) references ImageInfo(id)
);

/* palette 테이블 기본키, 외래키 삭제 코드
alter table palette drop foreign key palette_ibfk_1;
alter table palette drop primary key;
*/

-- 좋아요 테이블
create table FavoriteInfo(
    uid varchar(60) not null,
    imageid int not null,
    favorite_yn char(1) not null default 'y',
    foreign key(uid) references user(uid)
);


insert into CategoryInfo(category_name) values ('동물');
insert into CategoryInfo(category_name) values ('강아지');
insert into CategoryInfo(category_name) values ('고양이');
insert into CategoryInfo(category_name) values ('물고기');
insert into CategoryInfo(category_name) values ('햄스터');
insert into CategoryInfo(category_name) values ('식물');
insert into CategoryInfo(category_name) values ('잎');
insert into CategoryInfo(category_name) values ('꽃');
insert into CategoryInfo(category_name) values ('나무');
insert into CategoryInfo(category_name) values ('패션');
insert into CategoryInfo(category_name) values ('상의');
insert into CategoryInfo(category_name) values ('하의');
insert into CategoryInfo(category_name) values ('신발');
insert into CategoryInfo(category_name) values ('악세사리');
insert into CategoryInfo(category_name) values ('풍경');
insert into CategoryInfo(category_name) values ('산');
insert into CategoryInfo(category_name) values ('바다');
insert into CategoryInfo(category_name) values ('인물');
insert into CategoryInfo(category_name) values ('음식');
insert into CategoryInfo(category_name) values ('식사');
insert into CategoryInfo(category_name) values ('디저트');
insert into CategoryInfo(category_name) values ('영수증');
insert into CategoryInfo(category_name) values ('바코드');
insert into CategoryInfo(category_name) values ('캡쳐화면');
insert into CategoryInfo(category_name) values ('차량');
insert into CategoryInfo(category_name) values ('인테리어');

insert into parent_category(category_name, parent_name) values ('강아지', '동물');
insert into parent_category(category_name, parent_name) values ('고양이', '동물');
insert into parent_category(category_name, parent_name) values ('물고기', '동물');
insert into parent_category(category_name, parent_name) values ('햄스터', '동물');
insert into parent_category(category_name, parent_name) values ('잎', '식물');
insert into parent_category(category_name, parent_name) values ('꽃', '식물');
insert into parent_category(category_name, parent_name) values ('나무', '식물');
insert into parent_category(category_name, parent_name) values ('상의', '패션');
insert into parent_category(category_name, parent_name) values ('하의', '패션');
insert into parent_category(category_name, parent_name) values ('신발', '패션');
insert into parent_category(category_name, parent_name) values ('악세사리', '패션');
insert into parent_category(category_name, parent_name) values ('산', '풍경');
insert into parent_category(category_name, parent_name) values ('바다', '풍경');
insert into parent_category(category_name, parent_name) values ('식사', '음식');
insert into parent_category(category_name, parent_name) values ('디저트', '음식');