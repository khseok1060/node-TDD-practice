const request = require('supertest');
const should = require('should');

const app = require('./index');

describe('GET /users는 ', () => {
    describe('성공시 ', () => {
        it('유저 객체를 담은 배열로 응답한다', (done) => {
            request(app)
                .get('/users')
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array);
                    done();
                });
        });

        it('최대 limit 개수만큼 응답한다', (done) => {
            request(app)
                .get('/users?limit=2')
                .end((err, res) => {
                    res.body.should.have.lengthOf(2);
                    done();
                });
        });
    });
    
    describe('실패시 ', () => {
        it('limit이 숫자형이 아니면 400을 응답한다', () => {
            request(app)
                .get('/users?limit=one')
                .expect(400)
                .end((err, res) => {
                    done();
                });
        });
    });

})

describe('GET /users/1은 ', () => {
    describe('성공시 ', () => {
        it('id가 1인 user의 객체를 반환한다', () => {
            request(app)
                .get('/users/1')
                .end((err, res) => {
                    res.body.should.have.property('id', 1);
                    done();
                });
        });
    });
    describe('실패시 ', () => {
        it('id가 숫자가 아닐시 404를 응답한다', (done) => {
            request(app)
                .get('/users/one')
                .expect(400)
                .end(done);
        });
        it('id로 유저를 찾을 수 없을 경우 404로 응답한다', (done) => {
            request(app)
                .get('/users/999')
                .expect(404)
                .end(done);
        });
    });
})