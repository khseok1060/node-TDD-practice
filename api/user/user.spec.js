const request = require('supertest');
const should = require('should');

const app = require('../../');
const models = require('../../models');

describe('GET /users는 ', () => {
    const users = [{name: 'alice'}, {name: 'bek'}, {name: 'chris'}];
    before( () => models.sequelize.sync( {force: true} ) );
    before( () => models.User.bulkCreate(users) );

    describe('성공시 ', () => {
        it('유저 객체를 담은 배열로 응답한다', done => {
            request(app)
                .get('/users')
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array);
                    done();
                });
        });

        it('최대 limit 개수만큼 응답한다', done => {
            request(app)
                .get('/users?limit=2')
                .end((err, res) => {
                    res.body.should.have.lengthOf(2);
                    done();
                });
        });
    });
    
    describe('실패시 ', () => {
        it('limit이 숫자형이 아니면 400을 응답한다', done => {
            request(app)
                .get('/users?limit=one')
                .expect(400)
                .end(done);
        });
    });

})

describe('GET /users/:id은 ', () => {
    const users = [{name: 'alice'}, {name: 'bek'}, {name: 'chris'}];
    before( () => models.sequelize.sync( {force: true} ) );
    before( () => models.User.bulkCreate(users) );

    describe('성공시 ', () => {
        it('id가 1인 user의 객체를 반환한다', done => {
            request(app)
                .get('/users/1')
                .end((err, res) => {
                    res.body.should.have.property('id', 1);
                    done();
                });
        });
    });
    describe('실패시 ', () => {
        it('id가 숫자가 아닐시 404를 응답한다', done => {
            request(app)
                .get('/users/one')
                .expect(400)
                .end(done);
        });
        it('id로 유저를 찾을 수 없을 경우 404로 응답한다', done => {
            request(app)
                .get('/users/999')
                .expect(404)
                .end(done);
        });
    });
})

describe('DELETE /users/:id은', () => {
    const users = [{name: 'alice'}, {name: 'bek'}, {name: 'chris'}];
    before( () => models.sequelize.sync( {force: true} ) );
    before( () => models.User.bulkCreate(users) );

    describe('성공시 ', () => {
        it('204를 응답한다', done => {
            request(app)
                .delete('/users/1')
                .expect(204)
                .end(done);
        });
    });
    describe('실패시 ', () => {
        it('id가 숫자가 아닐경우 400으로 응답한다', done => {
            request(app)
                .delete('/users/one')
                .expect(400)
                .end(done);
        });
    });
});

describe('POST /users는 ', () => {
    const users = [{name: 'alice'}, {name: 'bek'}, {name: 'chris'}];
    before( () => models.sequelize.sync( {force: true} ) );
    before( () => models.User.bulkCreate(users) );

    let name = 'daniel';
    let body;
    before(done => {
         request(app)
                .post('/users')
                .send({name})
                .expect(201)
                .end((err, res) => {
                    body = res.body;
                    done();
                });
    });

    describe('성공시 ', () => {
        it('생성된 유저 객체를 반환한다', done => {
            body.should.have.property('id');
            done();
        });
        it('입력한 name을 반환한다', done => {
            body.should.have.property('name', name);
            done();
        })
    });

    describe('실패시 ', () => {
        it('name 파라메터 누락시 400을 반환환다', done => {
            request(app)
                .post('/users')
                .send({})
                .expect(400)
                .end(done);
        });
        it('name이 중복일 경우 409를 반환한다', done => {
            request(app)
                .post('/users')
                .send({name: 'daniel'})
                .expect(409)
                .end(done);
        })
    });
}) 

describe('PUT /users/:id는 ', () => {
    const users = [{name: 'alice'}, {name: 'bek'}, {name: 'chris'}];
    before( () => models.sequelize.sync( {force: true} ) );
    before( () => models.User.bulkCreate(users) );

    describe('성공시 ', () => {
        it('변경된 name을 응답한다', done => {
            const name = 'charlie';
            request(app)
                .put('/users/3')
                .send({name})
                .end((err, res) => {
                    res.body.should.have.property('name', name);
                    done();
                });
        });
    });
    describe('실패시 ', () => {
        it('id가 숫자가 아닐시 400을 응답한다', done => {
            request(app)
                .put('/users/one')
                .expect(400)
                .end(done)
        });
        it('name이 없을 경우 400을 응답한다', done => {
            request(app)
                .put('/users/1')
                .send({})
                .expect(400)
                .end(done)
        });
        it('없는 유저일 경우 404을 응답한다', done => {
            request(app)
                .put('/users/99999')
                .send({name: 'foo'})
                .expect(404)
                .end(done)
        });
        it('이름이 중복일 경우 409을 응답한다', done => {
            request(app)
                .put('/users/3')
                .send({name: 'bek'})
                .expect(409)
                .end(done)
        });

    })

})