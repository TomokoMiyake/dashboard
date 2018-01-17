(function() {
    'use strict';

    kintone.events.on('app.record.index.show', function(event) {
        var dashboard = document.getElementById('dashboard');

        // カスタマイズビュー以外の一覧では処理しない
        if (!dashboard) {
            return;
        }

        // 表示対象レコードなしの場合の注意書き
        var records = event.records;
        if (!records || !records.length) {
            dashboard.innerHTML = '表示するレコードがありません';
            return;
        }

        // ダッシュボードの項目定義
        var shopA = ['納品日時', '麺', 'チャーシュー', 'メンマ'];
        var shopB = ['納品日時', '麺', 'チャーシュー'];
        var shopC = ['納品日時', '麺'];

        // テーブル要素の作成
        var trA = document.getElementById('trA');
        var trB = document.getElementById('trB');
        var trC = document.getElementById('trC');
        var tbodyA = document.getElementById('tbodyA');
        var tbodyB = document.getElementById('tbodyB');
        var tbodyC = document.getElementById('tbodyC');

        shopA.forEach(function(item) {
            var th = document.createElement('th');
            th.innerHTML = item;
            trA.appendChild(th);
        });

        shopB.forEach(function(item) {
            var th = document.createElement('th');
            th.innerHTML = item;
            trB.appendChild(th);
        });

        shopC.forEach(function(item) {
            var th = document.createElement('th');
            th.innerHTML = item;
            trC.appendChild(th);
        });

        // レコードの値当て込み
        records.forEach(function(record) {
            var date = new Date(record.date.value);
            var dateString = date.toLocaleString();
            switch (record.shop.value) {
                case 'A':
                    var rowA = tbodyA.insertRow(tbodyA.rows.length);
                    var cellA1 = rowA.insertCell(0);
                    var cellA2 = rowA.insertCell(1);
                    var cellA3 = rowA.insertCell(2);
                    var cellA4 = rowA.insertCell(3);

                    cellA1.innerHTML = dateString;
                    cellA2.innerHTML = record.noodle.value;
                    cellA3.innerHTML = record.chashyu.value;
                    cellA4.innerHTML = record.mennma.value;
                    break;
                case 'B':
                    var rowB = tbodyB.insertRow(tbodyB.rows.length);
                    var cellB1 = rowB.insertCell(0);
                    var cellB2 = rowB.insertCell(1);
                    var cellB3 = rowB.insertCell(2);

                    cellB1.innerHTML = dateString;
                    cellB2.innerHTML = record.noodle.value;
                    cellB3.innerHTML = record.chashyu.value;
                    break;
                case 'C':
                    var rowC = tbodyC.insertRow(tbodyC.rows.length);
                    var cellC1 = rowC.insertCell(0);
                    var cellC2 = rowC.insertCell(1);

                    cellC1.innerHTML = dateString;
                    cellC2.innerHTML = record.noodle.value;
                    break;
            }
        });
    });
})();
