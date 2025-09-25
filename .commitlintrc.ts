/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // 새 기능
        "fix", // 버그 수정
        "docs", // 문서 변경
        "style", // 코드 포맷팅, 세미콜론 누락 등 (코드 변경 없음)
        "design", // 디자인 변경
        "rename", // 파일 이름 변경
        "remove", // 파일 삭제
        "comment", // 주석 추가 또는 수정
        "refactor", // 코드 리팩토링
        "perf", // 성능 개선
        "test", // 테스트 추가 또는 수정
        "chore", // 빌드 프로세스, 패키지 매니저 설정 등 (코드 변경 없음)
        "ci", // CI 설정 변경
        "build", // 빌드 시스템 또는 외부 종속성 변경
        "revert", // 이전 커밋 되돌리기
      ],
    ],
    "subject-case": [0], // 제목 대소문자 규칙 비활성화
  },
};
