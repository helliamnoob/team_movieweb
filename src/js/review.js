let reviewCount = 0;

document
   .getElementById('reviewForm')
   .addEventListener('submit', function (event) {
      event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

      const author = document.getElementById('author').value;
      const content = document.getElementById('content').value;
      const password = document.getElementById('password').value;
      const rating = document.getElementById('rating').value;
      const nowId = localStorage.getItem('nowId');
      const number = reviewCount++;

      const review = {
         author: author,
         content: content,
         password: password,
         rating: rating,
         nowId: nowId,
         number: number,
      };
      saveReview(review);
      displayReviews();
   });
   

// 리뷰를 저장하는 함수
function saveReview(review) {
   let reviews = localStorage.getItem('reviews');
   if (reviews) {
      reviews = JSON.parse(reviews);
   } else {
      reviews = [];
   }
   review.movieId = id;
   reviews.push(review);
   localStorage.setItem('reviews', JSON.stringify(reviews));
}

// 리뷰 목록을 표시하는 함수
export function displayReviews() {
   const reviewList = document.getElementById('reviewList');
   reviewList.innerHTML = '';
   let reviews = localStorage.getItem('reviews');
   let nowId = localStorage.getItem('nowId');

   if (reviews) {
      reviews = JSON.parse(reviews);
      reviews
         .filter((review) => review.movieId === id) // 현재 페이지의 영화에 해당하는 리뷰만 필터링
         .forEach((review) => {
            const reviewItem = document.createElement('div');
            reviewItem.className = 'review';

            reviewItem.innerHTML =
               '<p><strong>작성자:</strong> ' +
               review.author +
               '</p><p><strong>내용:</strong> ' +
               review.content +
               '</p>';

            const ratingElement = document.createElement('p');
            ratingElement.innerHTML =
               '<strong>평점:</strong> ' + getStarRating(review.rating);
            reviewItem.appendChild(ratingElement);
            reviewList.appendChild(reviewItem);
            if(review.nowId === nowId){
                const editButton = document.createElement('button');
                editButton.innerHTML = '수정';
                editButton.id = 'editBtn';
                editButton.onclick = function () {
                editReview(review);
                };
                reviewItem.appendChild(editButton);

                const deleteButton = document.createElement('button');
                deleteButton.id = nowId;
                deleteButton.innerHTML = '삭제';
                deleteButton.onclick = function () {
                deleteReview(review);
                };

                reviewItem.appendChild(deleteButton);
            }
         });
   }
}

// 리뷰 수정
function editReview(review) {
   let reviews = localStorage.getItem('reviews');
   if (reviews) {
      reviews = JSON.parse(reviews);

      // 현재 영화에 해당하는 리뷰를 찾음
      const reviewIndex = reviews.findIndex(
         (item) => item.movieId === review.movieId,
      );
      if (reviewIndex !== -1) {
         const existingReview = reviews[reviewIndex];

         const enteredPassword = prompt('비밀번호를 입력하세요.');
         if (enteredPassword === existingReview.password) {
            const newContent = prompt(
               '새로운 리뷰 내용을 입력하세요.',
               existingReview.content,
            );
            const newRating = parseInt(
               prompt('새로운 평점을 입력하세요 (1-5)', existingReview.rating),
            );
            if (newRating > 5) {
               alert('평점은 5 이하의 숫자로 입력해주세요.');
            } else {
               existingReview.rating = newRating;
               existingReview.content = newContent;

               localStorage.setItem('reviews', JSON.stringify(reviews));
               displayReviews();
            }
         } else {
            alert('비밀번호가 일치하지 않습니다.');
         }
      }
   }
}

// 리뷰 삭제
function deleteReview(review) {
   let reviews = localStorage.getItem('reviews');
   if (reviews) {
      reviews = JSON.parse(reviews);

      const reviewIndex = reviews.findIndex(
         (item) => item.number === review.number,
       
      );

      if (reviewIndex !== -1) {
         const existingReview = reviews[reviewIndex];

         const enteredPassword = prompt('비밀번호를 입력하세요.');
         if (enteredPassword === existingReview.password) {
            reviews.splice(reviewIndex, 1);
            localStorage.setItem('reviews', JSON.stringify(reviews));
            displayReviews();
         } else {
            alert('비밀번호가 일치하지 않습니다.');
         }
      }
   }
}

// 별 아이콘으로 변환하는 함수
function getStarRating(rating) {
   const roundedRating = Math.round(parseFloat(rating));
   const stars = '<span class="stars">&#9733;</span>'.repeat(roundedRating); // 별 아이콘을 반복하여 표시
   return stars;
}

// 리뷰 내용 입력 제한 설정
const contentInput = document.getElementById('content');
const MAX_LENGTH = 100;

contentInput.addEventListener('input', function () {
   const content = contentInput.value;
   const characterCount = content.length;

   // 글자 수 표시 업데이트
   const characterCountElement = document.querySelector('.character-count');
   characterCountElement.textContent = characterCount + ' / ' + MAX_LENGTH;

   if (content.length > MAX_LENGTH) {
      contentInput.value = content.slice(0, MAX_LENGTH);
      alert('리뷰 내용은 최대 ' + MAX_LENGTH + '자까지 입력 가능합니다.');
   }
});

// 페이지 로드 시 저장된 리뷰 표시
displayReviews();
