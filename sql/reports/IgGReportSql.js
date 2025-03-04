export const selectIgGquery = `
SELECT 
    res.입력날짜 as date, res.userId, res.userName, res.userGender, res.userAge, res.userBirth, 
	MAX( CASE WHEN res.검사코드 = '41001' THEN res.결과값 END ) AS '메밀' /* 메밀(Buckwheat) */,
	MAX( CASE WHEN res.검사코드 = '41002' THEN res.결과값 END ) AS '밀' /* 밀(Wheat) */,
	MAX( CASE WHEN res.검사코드 = '41003' THEN res.결과값 END ) AS '보리' /* 보리(Barley meal) */,
	MAX( CASE WHEN res.검사코드 = '41004' THEN res.결과값 END ) AS '쌀' /* 쌀(Rice) */,
	MAX( CASE WHEN res.검사코드 = '41005' THEN res.결과값 END ) AS '오트밀' /* 오트밀(Oat meal) */,
	MAX( CASE WHEN res.검사코드 = '41006' THEN res.결과값 END ) AS '옥수수' /* 옥수수(Maize) */,
	MAX( CASE WHEN res.검사코드 = '41007' THEN res.결과값 END ) AS '호밀' /* 호밀(Rye meal) */,
	MAX( CASE WHEN res.검사코드 = '41008' THEN res.결과값 END ) AS '글루텐' /* 글루텐(Gluten) */,
	MAX( CASE WHEN res.검사코드 = '41009' THEN res.결과값 END ) AS '가지' /* 가지(Aubergine) */,
	MAX( CASE WHEN res.검사코드 = '41010' THEN res.결과값 END ) AS '감자' /* 감자(Potato) */,
	MAX( CASE WHEN res.검사코드 = '41011' THEN res.결과값 END ) AS '고구마' /* 고구마(Sweet potato) */,
	MAX( CASE WHEN res.검사코드 = '41012' THEN res.결과값 END ) AS '고추' /* 고추(Hot pepper) */,
	MAX( CASE WHEN res.검사코드 = '41013' THEN res.결과값 END ) AS '당근' /* 당근(Carrot) */,
	MAX( CASE WHEN res.검사코드 = '41014' THEN res.결과값 END ) AS '무' /* 무(White radish) */,
	MAX( CASE WHEN res.검사코드 = '41015' THEN res.결과값 END ) AS '배추' /* 배추(Chinese cabbage) */,
	MAX( CASE WHEN res.검사코드 = '41016' THEN res.결과값 END ) AS '버섯' /* 버섯(Mushroom) */,
	MAX( CASE WHEN res.검사코드 = '41017' THEN res.결과값 END ) AS '상추' /* 상추(Romaine salat) */,
	MAX( CASE WHEN res.검사코드 = '41018' THEN res.결과값 END ) AS '시금치' /* 시금치(Spinach) */,
	MAX( CASE WHEN res.검사코드 = '41019' THEN res.결과값 END ) AS '양배추' /* 양배추(Cabbage) */,
	MAX( CASE WHEN res.검사코드 = '41020' THEN res.결과값 END ) AS '양파' /* 양파(Onion) */,
	MAX( CASE WHEN res.검사코드 = '41021' THEN res.결과값 END ) AS '오이' /* 오이(Cucumber) */,
	MAX( CASE WHEN res.검사코드 = '41022' THEN res.결과값 END ) AS '올리브' /* 올리브(Olive) */,
	MAX( CASE WHEN res.검사코드 = '41023' THEN res.결과값 END ) AS '토마토' /* 토마토(Tomato) */,
	MAX( CASE WHEN res.검사코드 = '41024' THEN res.결과값 END ) AS '호박' /* 호박(Pumpkin) */,
	MAX( CASE WHEN res.검사코드 = '41025' THEN res.결과값 END ) AS '고등어' /* 고등어(Mackerel) */,
	MAX( CASE WHEN res.검사코드 = '41026' THEN res.결과값 END ) AS '광어' /* 광어(Hailbut) */,
	MAX( CASE WHEN res.검사코드 = '41027' THEN res.결과값 END ) AS '대구' /* 대구(Cod) */,
	MAX( CASE WHEN res.검사코드 = '41028' THEN res.결과값 END ) AS '멸치' /* 멸치(Anchovy) */,
	MAX( CASE WHEN res.검사코드 = '41029' THEN res.결과값 END ) AS '연어' /* 연어(Salmon) */,
	MAX( CASE WHEN res.검사코드 = '41030' THEN res.결과값 END ) AS '장어' /* 장어(Eel) */,
	MAX( CASE WHEN res.검사코드 = '41031' THEN res.결과값 END ) AS '참치' /* 참치(Tuna) */,
	MAX( CASE WHEN res.검사코드 = '41032' THEN res.결과값 END ) AS '청어' /* 청어(Herring) */,
	MAX( CASE WHEN res.검사코드 = '41033' THEN res.결과값 END ) AS '문어' /* 문어(Octopus) */,
	MAX( CASE WHEN res.검사코드 = '41034' THEN res.결과값 END ) AS '오징어' /* 오징어(Cuttlefish) */,
	MAX( CASE WHEN res.검사코드 = '41035' THEN res.결과값 END ) AS '게' /* 게(Crab) */,
	MAX( CASE WHEN res.검사코드 = '41036' THEN res.결과값 END ) AS '굴' /* 굴(Oyster) */,
	MAX( CASE WHEN res.검사코드 = '41037' THEN res.결과값 END ) AS '바닷가재' /* 바닷가재(Lobster) */,
	MAX( CASE WHEN res.검사코드 = '41038' THEN res.결과값 END ) AS '새우' /* 새우(Shrimp) */,
	MAX( CASE WHEN res.검사코드 = '41039' THEN res.결과값 END ) AS '홍합' /* 홍합(Blue mussel) */,
	MAX( CASE WHEN res.검사코드 = '41040' THEN res.결과값 END ) AS '닭고기' /* 닭고기(Chicken) */,
	MAX( CASE WHEN res.검사코드 = '41041' THEN res.결과값 END ) AS '돼지고기' /* 돼지고기(Pork) */,
	MAX( CASE WHEN res.검사코드 = '41042' THEN res.결과값 END ) AS '소고기' /* 소고기(Beef) */,
	MAX( CASE WHEN res.검사코드 = '41043' THEN res.결과값 END ) AS '양고기' /* 양고기(Lamb) */,
	MAX( CASE WHEN res.검사코드 = '41044' THEN res.결과값 END ) AS '오리고기' /* 오리고기(Duck) */,
	MAX( CASE WHEN res.검사코드 = '41045' THEN res.결과값 END ) AS '계란노른자' /* 계란노른자(Egg yolk) */,
	MAX( CASE WHEN res.검사코드 = '41046' THEN res.결과값 END ) AS '계란흰자' /* 계란흰자(Egg white) */,
	MAX( CASE WHEN res.검사코드 = '41047' THEN res.결과값 END ) AS '메추리알' /* 메추리알(Quail egg) */,
	MAX( CASE WHEN res.검사코드 = '41048' THEN res.결과값 END ) AS '딸기' /* 딸기(Strawberry) */,
	MAX( CASE WHEN res.검사코드 = '41049' THEN res.결과값 END ) AS '레몬' /* 레몬(Lemon) */,
	MAX( CASE WHEN res.검사코드 = '41050' THEN res.결과값 END ) AS '망고' /* 망고(Mango) */,
	MAX( CASE WHEN res.검사코드 = '41051' THEN res.결과값 END ) AS '멜론' /* 멜론(Melon) */,
	MAX( CASE WHEN res.검사코드 = '41052' THEN res.결과값 END ) AS '바나나' /* 바나나(Banana) */,
	MAX( CASE WHEN res.검사코드 = '41053' THEN res.결과값 END ) AS '배' /* 배(Pear) */,
	MAX( CASE WHEN res.검사코드 = '41054' THEN res.결과값 END ) AS '복숭아' /* 복숭아(Peach) */,
	MAX( CASE WHEN res.검사코드 = '41055' THEN res.결과값 END ) AS '사과' /* 사과(Apple) */,
	MAX( CASE WHEN res.검사코드 = '41056' THEN res.결과값 END ) AS '수박' /* 수박(Watermelon) */,
	MAX( CASE WHEN res.검사코드 = '41057' THEN res.결과값 END ) AS '오렌지' /* 오렌지(Orange) */,
	MAX( CASE WHEN res.검사코드 = '41058' THEN res.결과값 END ) AS '자몽' /* 자몽(Grapefruit) */,
	MAX( CASE WHEN res.검사코드 = '41059' THEN res.결과값 END ) AS '키위' /* 키위(Kiwi) */,
	MAX( CASE WHEN res.검사코드 = '41060' THEN res.결과값 END ) AS '파인애플' /* 파인애플(Pineapple) */,
	MAX( CASE WHEN res.검사코드 = '41061' THEN res.결과값 END ) AS '포도' /* 포도(Grape) */,
	MAX( CASE WHEN res.검사코드 = '41062' THEN res.결과값 END ) AS '치즈' /* 치즈(Cheese) */,
	MAX( CASE WHEN res.검사코드 = '41063' THEN res.결과값 END ) AS '산양유' /* 산양유(Goat milk) */,
	MAX( CASE WHEN res.검사코드 = '41064' THEN res.결과값 END ) AS '요거트' /* 요거트(Sour milk product) */,
	MAX( CASE WHEN res.검사코드 = '41065' THEN res.결과값 END ) AS '우유' /* 우유(Cow's Milk) */,
	MAX( CASE WHEN res.검사코드 = '41066' THEN res.결과값 END ) AS '우유단백질(카제인)' /* 우유단백질(Casein) */,
	MAX( CASE WHEN res.검사코드 = '41067' THEN res.결과값 END ) AS '완두콩' /* 푸른 완두콩(Green pea) */,
	MAX( CASE WHEN res.검사코드 = '41068' THEN res.결과값 END ) AS '대두콩' /* 대두콩(Soya bean) */,
	MAX( CASE WHEN res.검사코드 = '41069' THEN res.결과값 END ) AS '땅콩' /* 땅콩(Peanut) */,
	MAX( CASE WHEN res.검사코드 = '41070' THEN res.결과값 END ) AS '밤' /* 밤(Sweet chestnut) */,
	MAX( CASE WHEN res.검사코드 = '41071' THEN res.결과값 END ) AS '아몬드' /* 아몬드(Almond) */,
	MAX( CASE WHEN res.검사코드 = '41072' THEN res.결과값 END ) AS '녹두' /* 녹두(Mung bean) */,
	MAX( CASE WHEN res.검사코드 = '41073' THEN res.결과값 END ) AS '잣' /* 잣(Pine nut) */,
	MAX( CASE WHEN res.검사코드 = '41074' THEN res.결과값 END ) AS '참깨' /* 참깨(Sesame) */,
	MAX( CASE WHEN res.검사코드 = '41075' THEN res.결과값 END ) AS '피스타치오' /* 피스타치오(Pistachio) */,
	MAX( CASE WHEN res.검사코드 = '41076' THEN res.결과값 END ) AS '해바라기씨' /* 해바라기씨(Sunflower seed) */,
	MAX( CASE WHEN res.검사코드 = '41077' THEN res.결과값 END ) AS '호두' /* 호두(Walnut) */,
	MAX( CASE WHEN res.검사코드 = '41078' THEN res.결과값 END ) AS '겨자' /* 겨자(Mustard) */,
	MAX( CASE WHEN res.검사코드 = '41079' THEN res.결과값 END ) AS '계피' /* 계피(Cinnamon) */,
	MAX( CASE WHEN res.검사코드 = '41080' THEN res.결과값 END ) AS '칸디다균(곰팡이)' /* 곰팡이(C.albicans) */,
	MAX( CASE WHEN res.검사코드 = '41081' THEN res.결과값 END ) AS '꿀' /* 꿀(Honey) */,
	MAX( CASE WHEN res.검사코드 = '41082' THEN res.결과값 END ) AS '녹차' /* 녹차(Tea green) */,
	MAX( CASE WHEN res.검사코드 = '41083' THEN res.결과값 END ) AS '마늘' /* 마늘(Garlic) */,
	MAX( CASE WHEN res.검사코드 = '41084' THEN res.결과값 END ) AS '생강' /* 생강(Ginger) */,
	MAX( CASE WHEN res.검사코드 = '41085' THEN res.결과값 END ) AS '설탕' /* 설탕(Sugar) */,
	MAX( CASE WHEN res.검사코드 = '41086' THEN res.결과값 END ) AS '카레' /* 카레(Curry) */,
	MAX( CASE WHEN res.검사코드 = '41087' THEN res.결과값 END ) AS '커피' /* 커피(Coffee) */,
	MAX( CASE WHEN res.검사코드 = '41088' THEN res.결과값 END ) AS '코코아' /* 코코아(Cocoa) */,
	MAX( CASE WHEN res.검사코드 = '41089' THEN res.결과값 END ) AS '효모균' /* 효모(Yeast) */,
	MAX( CASE WHEN res.검사코드 = '41090' THEN res.결과값 END ) AS '후추' /* 후추(Pepper) */
FROM 
	(SELECT 검사결과.접수일자 as '입력날짜', 
		ISNULL(검사접수.차트번호, '') as 'userId', 
		검사접수.성명 as 'userName',
		CASE 검사접수.성별코드 
			WHEN 'F' THEN '여'
			WHEN 'M' THEN '남'
		END 'userGender',
		검사접수.나이 as 'userAge',
		검사접수.주민등록번호 as 'userBirth',
		검사결과.검사코드,
		검사결과.항목순번,
		검사결과.결과값 
	FROM LabSpearSIB.dbo.검사접수 검사접수
	INNER JOIN LabSpearSIB.dbo.검사결과 검사결과 
	    	ON 검사결과.접수일자 = 검사접수.접수일자 
	    	AND 검사결과.접수번호 = 검사접수.접수번호 
	WHERE 검사결과.오더코드 = 'D0004'
	  AND 검사접수.차트번호 = @name
	) AS res
	LEFT JOIN LabSpearSIB.dbo.검사코드 code
		   ON res.검사코드 = code.검사코드
    GROUP BY 
            res.입력날짜,
            res.userId, 
            res.userName, 
            res.userGender, 
            res.userAge, 
            res.userBirth
	ORDER BY 입력날짜 DESC;
`;

export const selectLevels = `
SELECT TOP 1 * FROM LabSpearSIB.report.지연성알러지_참고치
ORDER BY ragstDate DESC
`;

export const insertLevels = `
INSERT INTO LabSpearSIB.report.지연성알러지_참고치
	(level1, level2, level3, level4, level5, rgstUser)
VALUES
	(@level1, @level2, @level3, @level4, @level5, @rgstUser);
`;

export const selectIgGIdByDate = `
	with rows as (
        SELECT ISNULL(검사접수.차트번호, '') as 'userId'
		FROM LabSpearSIB.dbo.검사접수 검사접수
		INNER JOIN LabSpearSIB.dbo.검사결과 검사결과 
		    ON 검사결과.접수일자 = 검사접수.접수일자 
		    AND 검사결과.접수번호 = 검사접수.접수번호 
	WHERE 검사결과.오더코드 = 'D0004'
	    AND 검사접수.차트번호 IS NOT NULL
		AND 검사접수.주민등록번호 IS NOT NULL
        AND 검사결과.결과값 IS NOT NULL
        AND 검사접수.접수일자 = @date
	GROUP BY 검사접수.접수일자, 검사접수.차트번호
    )
    select * from rows
`;