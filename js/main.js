'use strict';

{
  // パネルに関する処理
  class Panel {
    constructor() {
      const section = document.createElement('section');
      section.classList.add('panel');

      // ランダム表示されるパネルはimgから使うことを指示
      this.img = document.createElement('img');
      this.img.src = this.getRandomImage();

      this.timeoutId = undefined;

      // stopの画像はimgタブから使うことを指示
      this.stop = document.createElement('div');
      this.stop.textContent = 'STOP';
      this.stop.classList.add('stop', 'inactive');
      // stopボタンを押したら次の動作（＝止まるよう）に移るよう指示
      this.stop.addEventListener('click', () => {
        if (this.stop.classList.contains('inactive')) {
          return;
        }
        this.stop.classList.add('inactive');

        clearTimeout(this.timeoutId);

        panelsLeft--;
// パネルの数が０になったとき結果の判定をする
        if (panelsLeft === 0) {
          checkResult();
          spin.classList.remove('inactive');
          // パネルの数より、初期値は３
          panelsLeft = 3;
        }
      });

      section.appendChild(this.img);
      section.appendChild(this.stop);

      const main = document.querySelector('main');
      main.appendChild(section);
    }
// フォルダの中の画像を羅列
//         'img/seven.png',
//         'img/bell.png',
//         'img/cherry.png',
//         'img/bell copy.png',
//         'img/cherry copy.png',
//         'img/bell copy 2.png'
// 最初はimageの素材自体を上記のように増やしたが、同じ画像だと判断されなかったため、単純に羅列した
    getRandomImage() {
      const images = [
        'img/seven.png',
        'img/bell.png',
        'img/cherry.png',
        'img/bell.png',
        'img/cherry.png',
        'img/bell.png'
      ];
      return images[Math.floor(Math.random() * images.length)];
    }
// ランダムにパネルを表示する＝RandomImage（一度だけ）
    spin() {
      this.img.src = this.getRandomImage();
      // 30ミリ秒後に同じ操作を繰り返す
      this.timeoutId = setTimeout(() => {
        this.spin();
      }, 30);
    }

    isUnmatched(p1, p2) {
      return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
    }
// マッチしなかったときにパネルの色を薄くする
// 内容はcssに記入
    unmatch() {
      this.img.classList.add('unmatched');
    }
// spinボタンを押した時点で、パネルの色とstopボタンが薄ければそれを解除する指示を出す
    activate() {
      this.img.classList.remove('unmatched');
      this.stop.classList.remove('inactive');
    }

  }

// パネルが他のパネルとマッチしたかを調べる
  function checkResult() {
    if (panels[0].isUnmatched(panels[1], panels[2])) {
      panels[0].unmatch();
    }
    if (panels[1].isUnmatched(panels[0], panels[2])) {
      panels[1].unmatch();
    }
    if (panels[2].isUnmatched(panels[0], panels[1])) {
      panels[2].unmatch();
    }
  }



  // インスタンスをつくる
  // 書き込んだ要素を表示させるために必要な指示
  const panels = [
    new Panel(),
    new Panel(),
    new Panel(),
  ];

  let panelsLeft = 3;

// spinボタンを押したら、画像がクルクル回るようにする
  const spin = document.getElementById('spin');
  spin.addEventListener('click', () => {
    // spinボタンを一度押したらボタンの色が薄くなる
    if (spin.classList.contains('inactive')) {
// spinボタンを一度押したらその後の操作は繰り返さないように指示＝return
// これをしないと何度もspinボタンが押せて、stopボタンを押しても止まらなくなる
      return;
    }
    spin.classList.add('inactive');

    panels.forEach(panel => {
      panel.activate();
      panel.spin();
    });
  });
}
