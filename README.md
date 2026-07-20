# TaskFlow

TaskFlow, kullanıcıların günlük görevlerini oluşturabildiği, listeleyebildiği, düzenleyebildiği, tamamlayabildiği ve silebildiği modern bir görev yönetim uygulamasıdır.

Proje, ReactJS ve Vite kullanılarak geliştirilmiştir. Görevler tarayıcının LocalStorage alanında saklandığı için sayfa yenilendiğinde veriler kaybolmaz.

## Canlı Proje

[TaskFlow uygulamasını Netlify üzerinde görüntüle](https://aydin-burak-taskflow.netlify.app/)

## GitHub Repository

[Projenin kaynak kodlarını GitHub üzerinde görüntüle](https://github.com/burak-kuyumcu/Javascript-web-projesi)

## Projenin Amacı

TaskFlow'un amacı, kullanıcıların görevlerini kolay ve düzenli şekilde yönetebileceği sade, hızlı ve kullanıcı dostu bir çalışma alanı sunmaktır.

Kullanıcılar görevlerini kategorilere ayırabilir, öncelik seviyelerini belirleyebilir, tamamlanma durumlarını takip edebilir ve çeşitli filtreleme seçenekleriyle aradıkları görevlere hızlıca ulaşabilir.

## Özellikler

### Temel CRUD İşlemleri

- Yeni görev oluşturma
- Görevleri listeleme
- Mevcut görevleri düzenleme
- Görevleri silme
- Silme işleminden önce onay alma

### Görev Yönetimi

- Görevi tamamlandı olarak işaretleme
- Tamamlanan görevi yeniden bekleyen durumuna alma
- Görevlere açıklama ekleme
- Kategori seçme
- Öncelik seviyesi belirleme
- Oluşturulma tarihini görüntüleme

### Arama ve Filtreleme

- Görev başlığına göre arama
- Görev açıklamasına göre arama
- Tamamlanma durumuna göre filtreleme
- Kategoriye göre filtreleme
- Öncelik seviyesine göre filtreleme
- Birden fazla filtreyi birlikte kullanma
- Aktif filtreleri tek tuşla temizleme

### İstatistikler

- Toplam görev sayısı
- Tamamlanan görev sayısı
- Bekleyen görev sayısı
- Yüksek öncelikli bekleyen görev sayısı
- Tamamlanma yüzdesi
- Görsel ilerleme çubuğu

### Kullanıcı Deneyimi

- Açık ve karanlık tema
- Tema tercihini LocalStorage içinde saklama
- İşlem sonrası bildirim mesajları
- Form doğrulama
- Karakter sınırı göstergesi
- Silme onay penceresi
- Boş liste ve boş arama sonucu ekranları
- Responsive tasarım
- Masaüstü, tablet ve telefon uyumluluğu

## Kullanılan Teknolojiler

- ReactJS
- Vite
- JavaScript
- HTML5
- Pure CSS
- LocalStorage
- ESLint
- Git
- GitHub
- GitHub Desktop
- Netlify

## CRUD İşlemleri

### Create

Kullanıcı başlık, açıklama, kategori ve öncelik bilgilerini girerek yeni bir görev oluşturabilir.

### Read

LocalStorage içinde bulunan görevler React bileşenleri kullanılarak kart yapısında listelenir.

### Update

Kullanıcı görev başlığını, açıklamasını, kategorisini ve öncelik seviyesini düzenleyebilir. Görevin tamamlanma durumu da güncellenebilir.

### Delete

Kullanıcı bir görevi silme onay penceresi üzerinden kalıcı olarak silebilir.

## LocalStorage Kullanımı

Görevler aşağıdaki LocalStorage anahtarı altında saklanmaktadır:

```text
taskflow_tasks
```

Tema tercihi aşağıdaki anahtar altında saklanmaktadır:

```text
taskflow_theme
```

Örnek görev nesnesi:

```javascript
{
  id: "benzersiz-gorev-id",
  title: "React projesini tamamla",
  description: "Görev yönetim uygulamasının son kontrollerini yap.",
  category: "Yazılım",
  priority: "high",
  completed: false,
  createdAt: "2026-07-20T10:00:00.000Z",
  updatedAt: null
}
```

## Proje Klasör Yapısı

```text
taskflow
├── public
├── src
│   ├── components
│   │   ├── ConfirmModal.jsx
│   │   ├── Header.jsx
│   │   ├── TaskCard.jsx
│   │   ├── TaskFilters.jsx
│   │   ├── TaskForm.jsx
│   │   ├── TaskStats.jsx
│   │   └── Toast.jsx
│   ├── pages
│   │   ├── AboutPage.jsx
│   │   └── HomePage.jsx
│   ├── services
│   │   ├── localStorageService.js
│   │   └── themeService.js
│   ├── styles
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── netlify.toml
├── package.json
├── vite.config.js
└── README.md
```

## Projeyi Bilgisayarda Çalıştırma

### 1. Repository'yi bilgisayara indirin

GitHub Desktop kullanarak repository'yi klonlayabilir veya GitHub üzerinden ZIP olarak indirebilirsiniz.

### 2. Proje klasörüne girin

```bash
cd taskflow
```

### 3. Gerekli paketleri yükleyin

```bash
npm install
```

### 4. Geliştirme sunucusunu çalıştırın

```bash
npm run dev
```

Terminalde gösterilen bağlantıyı tarayıcıda açın:

```text
http://localhost:5173
```

## Kullanılabilir Komutlar

Projeyi geliştirme ortamında çalıştırmak için:

```bash
npm run dev
```

Kod kalitesini ESLint ile kontrol etmek için:

```bash
npm run lint
```

Üretim sürümünü oluşturmak için:

```bash
npm run build
```

Üretim sürümünü bilgisayarda ön izlemek için:

```bash
npm run preview
```

Üretim ön izlemesi genellikle şu adreste çalışır:

```text
http://localhost:4173
```

## Netlify Yayını

Proje GitHub repository'sine bağlı olarak Netlify üzerinde yayınlanmıştır.

Netlify yapılandırması:

```text
Production branch: main
Build command: npm run build
Publish directory: dist
```

`main` dalına yeni bir değişiklik gönderildiğinde Netlify projeyi otomatik olarak yeniden derler ve aynı canlı site bağlantısında yayınlar.

Güncelleme sırası:

```text
Kodları değiştir
→ Dosyaları kaydet
→ GitHub Desktop ile commit oluştur
→ Push origin
→ Netlify otomatik olarak yeniden yayınlasın
```

## Responsive Tasarım

TaskFlow masaüstü, tablet ve telefon ekranlarına uyum sağlayacak şekilde geliştirilmiştir.

CSS media query yapıları kullanılarak aşağıdaki alanlar farklı ekran genişliklerine göre düzenlenmiştir:

- Navigasyon
- Görev kartları
- Görev formu
- İstatistik kartları
- Arama ve filtreleme alanları
- Silme onay penceresi
- Bildirim mesajları
- Tema değiştirme butonu

## Proje Gereksinimleri

| Gereksinim | Uygulamadaki Karşılığı |
|---|---|
| Modern JavaScript kütüphanesi | ReactJS |
| Proje çatısı | Vite |
| Components klasörü | Tekrar kullanılabilir React bileşenleri |
| Pages klasörü | HomePage ve AboutPage |
| Pure CSS | Global ve responsive tasarım |
| LocalStorage | Görev ve tema verilerinin saklanması |
| Ekleme işlemi | Yeni görev oluşturma |
| Listeleme işlemi | Görev kartlarının görüntülenmesi |
| Güncelleme işlemi | Görev düzenleme ve durum değiştirme |
| Silme işlemi | Onay penceresiyle görev silme |
| Ek özellik | Arama, filtreleme, tema ve istatistikler |
| GitHub yayını | Public repository |
| Netlify yayını | Canlı proje bağlantısı |

## Geliştirici

**Aydın Burak Kuyumcu**

