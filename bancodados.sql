create database geral;
use geral; 

create table animais ( 
id int auto_increment primary key,
Animal varchar(50),
especie varchar(50),
chip_iden int unique
) ;

create table clientes(
id int auto_increment primary key,
nome varchar(100),
email varchar(100) unique,
senha varchar(100),
telefone int(13) unique,
cpf int (10) unique
);

create table produtos(
id int auto_increment primary key,
nome varchar(100),
data_vali date,
preco decimal 
);


insert into animais (Animal, especie, chip_iden) values
("Cobra do milho","Pantherophis guttatus", 121212),
("Falsa coral","Lampropeltis triangulum", 131313),
("Jiboias","Boidae",141414),
("Píton"," Python molurus",151515),
("Iguana","Iguana iguana",161616),
("Teiú","Salvator merianae",171717),
("Jabuti piranga","Chelonoidis carbonaria",181818),
("jabuti tinga","Chelonoidis denticulata",191919),
("tigre d'gua","Trachemys dorbigni",111111)
;

insert into clientes (nome, email,senha,telefone,cpf) values
("miguel", "amostradinho6969@gmail.com", "miguelzinho1212",111111111,0123456789),
("matheus", "desempregado2222@gmail.com", "maraematheus22",222222222,987654321),
("francisco", "estacionario1111@gmail.com", "gerentedogacha",33333333,987456321),
("william", "culaborador6523@gmail.com", "colarorate3333",444444444,789456123),
("gabriel", "entopebanheir655@gmail.com", "kevinforever",555555555,132465789),
("lucas,", "furadordesinal654@gmail.com", "vrumvrum312",666666666,513016843)
;

insert into produtos (nome, preco) values 
("terraio A", 312.31), 
("ração", 23.44 ),
("forragem", 63.53),
("terrario B",254.51)
;
