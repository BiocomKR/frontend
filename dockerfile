# 1. Node.js 최신 버전 기반으로 이미지 생성
FROM node:18-alpine

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. package.json과 package-lock.json 복사
COPY package.json package-lock.json ./

# 4. 의존성 설치
RUN npm install

# 5. 모든 프로젝트 파일 복사
COPY . .

# 6. 환경 변수 설정 (핫 리로딩 가능하게)
ENV CHOKIDAR_USEPOLLING=true

# 6. 기본 실행 포트 설정
EXPOSE 3000

# 7. 개발 서버 실행
CMD ["npm", "run", "dev"]
