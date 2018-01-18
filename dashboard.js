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
            var day = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('/');
            var time = [date.getHours(), ('0' + date.getMinutes()).slice(-2)].join(':');
            var dateString = [day, time].join(' ');

            var codeA = [dateString, parseInt(record.noodle.value, 10), parseInt(record.chashyu.value, 10), parseInt(record.mennma.value, 10)];
            var codeB = [dateString, parseInt(record.noodle.value, 10), parseInt(record.chashyu.value, 10)];
            var codeC = [dateString, parseInt(record.noodle.value, 10)];

            switch (record.shop.value) {
                case 'A':
                    var rowA = tbodyA.insertRow(tbodyA.rows.length);
                    shopA.forEach(function(shopAItem) {
                        var num = shopA.indexOf(shopAItem);
                        var cellA = rowA.insertCell(num);
                        cellA.innerHTML = codeA[num];
                    });
                    break;
                case 'B':
                    var rowB = tbodyB.insertRow(tbodyB.rows.length);
                    shopB.forEach(function(shopBItem) {
                        var num = shopB.indexOf(shopBItem);
                        var cellB = rowB.insertCell(num);
                        cellB.innerHTML = codeB[num];
                    });
                    break;
                case 'C':
                    var rowC = tbodyC.insertRow(tbodyC.rows.length);
                    shopC.forEach(function(shopCItem) {
                        var num = shopB.indexOf(shopCItem);
                        var cellC = rowC.insertCell(num);
                        cellC.innerHTML = codeC[num];
                    });
                    break;
            }
        });
    });
})();
