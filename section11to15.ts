import { CurriculumPhase } from '../../types/excel';
import { createTableSheet } from '../helpers';

export const SECTIONS_11_TO_15: CurriculumPhase[] = [
  {
    id: 11,
    category: "Tarih ve Saat",
    title: "11. Tarih, Saat ve İş Günü Hesaplamaları",
    subtitle: "BUGÜN, ŞİMDİ, GÜN, AY, YIL, TARİH, TAMİŞGÜNÜ ve İŞGÜNÜ ile termin takibi",
    iconName: "Calendar",
    description: "Excel in arka plandaki tarih seri numarası mantığını, dinamik güncel tarih üretimini, fatura vadesi hesaplamayı, resmi tatilleri düşerek iş günü analizi yapmayı öğrenin.",
    lessons: [
      {
        id: "sec11_l1",
        phaseId: 11,
        unitId: "u11_1",
        title: "BUGÜN (TODAY) ve ŞİMDİ (NOW) Dinamik Tarih Fonksiyonları",
        shortDesc: "Çalışma kitabını her açtığınızda sistemin güncel tarihini ve saatini getirme.",
        category: "Tarih ve Saat",
        groupTitle: "Dinamik Tarih",
        primaryGoal: "Raporlarda bugünün tarihini dinamik olarak üretip fatura vade farklarını hesaplamak.",
        prerequisites: ["sec10_l6"],
        commonMistakes: ["BUGÜN fonksiyonunun parantezinin içine bir şey yazmaya çalışmak (BUGÜN() boş parantezle kullanılır)"],
        successCriteria: "BUGÜN fonksiyonunu uygulayabilmek.",
        level: "Başlangıç",
        durationMinutes: 10,
        functionsUsed: ["BUGÜN"],
        initialWorkbook: createTableSheet(undefined, undefined, undefined, undefined),
        objectives: [
          {
                    "id": "o1",
                    "title": "BUGÜN Fonksiyonu",
                    "description": "=BUGÜN() ile argümansız dinamik sistem tarihi alma."
          }
],
        teachingSteps: [
          {
                    "id": "ts1",
                    "title": "Tarihlerin Arka Planı",
                    "explanation": "Excel de 1 Ocak 1900 tarihi 1 sayısıdır. BUGÜN() fonksiyonu bugün kaçıncı günde olduğumuzun seri numarasını döner ve tarih olarak gösterir. Parantezi her zaman boştur: =BUGÜN()",
                    "speechText": "Excel de bugünün tarihini dinamik olarak yazdırmak için =BUGÜN() formülünü kullanırız. Dosyayı yarın açtığınızda tarih otomatik olarak yarına güncellenir."
          }
],
        tasks: [
          {
                    "id": "t11_1_1",
                    "stepNumber": 1,
                    "instruction": "B2 hücresine \"=BUGÜN()\" formülünü yazın.",
                    "targetCell": "B2",
                    "hints": [
                              "B2 hücresini seçin.",
                              "=BUGÜN() yazın.",
                              "Enter a basın. Günün tarihi görünecektir."
                    ],
                    "validation": {
                              "targetCell": "B2",
                              "expectedFormulaKeywords": [
                                        "BUGÜN",
                                        "TODAY"
                              ],
                              "successMessage": "Tebrikler! BUGÜN fonksiyonunu başarıyla yazdınız."
                    }
          }
],
        quiz: {
          "id": "q11_1",
          "title": "BUGÜN Fonksiyonu Testi",
          "passingScore": 80,
          "questions": [
                    {
                              "id": "q11_1_1",
                              "question": "Aşağıdakilerden hangisi hem bugünün tarihini HEM DE anlık saat ve dakikayı veren fonksiyondur?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "BUGÜN"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "ŞİMDİ (NOW)"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "SAAT"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "TARİH"
                                        }
                              ],
                              "correctOptionId": "b",
                              "explanation": "ŞİMDİ (NOW) fonksiyonu tarih ile birlikte anlık sistem saatini ve dakikasını da ekler.",
                              "measuredSkill": "ŞİMDİ vs BUGÜN farkı"
                    },
                    {
                              "id": "q11_1_extra",
                              "question": "BUGÜN (TODAY) ve ŞİMDİ (NOW) Dinamik Tarih Fonksiyonları konusunda Excel in sağladığı temel avantaj nedir?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "Otomatik hesaplama ve dinamik güncelleme"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "Verileri silmesi"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "Yalnızca yazdırma"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "Dosya boyutunu artırma"
                                        }
                              ],
                              "correctOptionId": "a",
                              "explanation": "Excel fonksiyonları formülleri dinamik olarak güncelleyerek manuel iş yükünü ortadan kaldırır.",
                              "measuredSkill": "Temel fonksiyon avantajı"
                    }
          ]
}
      },
      {
        id: "sec11_l2",
        phaseId: 11,
        unitId: "u11_2",
        title: "İki Tarih Arasındaki Gün Farkı ve Vade Hesaplama",
        shortDesc: "Vade tarihi ile fatura tarihi arasındaki gecikme gününü basit çıkarma işlemiyle bulma.",
        category: "Tarih ve Saat",
        groupTitle: "Vade Hesaplama",
        primaryGoal: "İki tarih hücresini birbirinden çıkararak geçen gün sayısını matematiksel olarak bulmak.",
        prerequisites: ["sec11_l1"],
        commonMistakes: ["Tarih farkı sonucunun da tarih olarak biçimlenmesi (sayı olarak biçimlendirilmelidir)"],
        successCriteria: "İki tarih farkını hesaplayıp gecikme gününü bulmak.",
        level: "Başlangıç",
        durationMinutes: 10,
        functionsUsed: [],
        initialWorkbook: createTableSheet(undefined, undefined, undefined, undefined),
        objectives: [
          {
                    "id": "o1",
                    "title": "Tarih Aritmetiği",
                    "description": "Büyük tarihten küçük tarihi çıkararak gün sayısına ulaşma."
          }
],
        teachingSteps: [
          {
                    "id": "ts1",
                    "title": "Tarihler Arasında Çıkarma",
                    "explanation": "Tarihler arka planda sayı olduğu için =C2-B2 formülü iki tarih arasında kaç gün olduğunu net olarak verir.",
                    "speechText": "Excel de tarihler sayıdır. Ödeme tarihinden fatura tarihini çıkardığınızda aradaki gün sayısını doğrudan elde edersiniz."
          }
],
        tasks: [
          {
                    "id": "t11_2_1",
                    "stepNumber": 1,
                    "instruction": "D2 hücresine \"=C2-B2\" formülünü yazarak geçen gün sayısını hesaplayın.",
                    "targetCell": "D2",
                    "hints": [
                              "D2 hücresini seçin.",
                              "=C2-B2 yazın.",
                              "16 Ekim - 1 Ekim = 15 gün çıkmalıdır."
                    ],
                    "validation": {
                              "targetCell": "D2",
                              "expectedValue": 15,
                              "successMessage": "Harika! Tarih farkını başarıyla hesapladınız."
                    }
          }
],
        quiz: {
          "id": "q11_2",
          "title": "Tarih Aritmetiği Testi",
          "passingScore": 80,
          "questions": [
                    {
                              "id": "q11_2_1",
                              "question": "A1 hücresinde bir tarih varken, o tarihten 30 gün sonraki tarihi bulmak için hangi formül yazılır?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "=A1 + 30"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "=TOPLA(A1; \"30 gün\")"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "=TARİH(A1 + 30)"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "=GÜN(A1) + 30"
                                        }
                              ],
                              "correctOptionId": "a",
                              "explanation": "Excel de her gün 1 tam sayısına eşittir; tarihe 30 eklemek 30 gün sonrasını verir.",
                              "measuredSkill": "Tarihe gün ekleme matematiği"
                    },
                    {
                              "id": "q11_2_extra",
                              "question": "İki Tarih Arasındaki Gün Farkı ve Vade Hesaplama konusunda Excel in sağladığı temel avantaj nedir?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "Otomatik hesaplama ve dinamik güncelleme"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "Verileri silmesi"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "Yalnızca yazdırma"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "Dosya boyutunu artırma"
                                        }
                              ],
                              "correctOptionId": "a",
                              "explanation": "Excel fonksiyonları formülleri dinamik olarak güncelleyerek manuel iş yükünü ortadan kaldırır.",
                              "measuredSkill": "Temel fonksiyon avantajı"
                    }
          ]
}
      },
      {
        id: "sec11_l3",
        phaseId: 11,
        unitId: "u11_3",
        title: "TAMİŞGÜNÜ (NETWORKDAYS) ile Hafta Sonlarını Düşme",
        shortDesc: "Cumartesi-Pazar ve resmi tatilleri çıkararak iki tarih arasındaki net çalışma gününü bulma.",
        category: "Tarih ve Saat",
        groupTitle: "İş Günü Analizi",
        primaryGoal: "İK bordro ve proje yönetiminde hafta sonlarını düşerek net çalışma gününü hesaplamak.",
        prerequisites: ["sec11_l2"],
        commonMistakes: ["Hafta sonlarının otomatik düşüldüğünü unutup elle gün eksiltmeye çalışmak"],
        successCriteria: "TAMİŞGÜNÜ fonksiyonu ile net mesai gününü hesaplamak.",
        level: "Orta",
        durationMinutes: 12,
        functionsUsed: ["TAMİŞGÜNÜ"],
        initialWorkbook: createTableSheet(undefined, undefined, undefined, undefined),
        objectives: [
          {
                    "id": "o1",
                    "title": "TAMİŞGÜNÜ Söz Dizimi",
                    "description": "=TAMİŞGÜNÜ(başlangıç; bitiş; [tatiller]) fonksiyonunun kavranması."
          }
],
        teachingSteps: [
          {
                    "id": "ts1",
                    "title": "Hafta Sonlarını Otomatik Çıkarın",
                    "explanation": "1 Ekim Perşembe ile 15 Ekim Perşembe arasında 15 takvim günü vardır. Ancak aradaki 4 hafta sonu gününü düştüğünüzde net 11 iş günü kalır. =TAMİŞGÜNÜ(B2; C2) bu hesabı otomatik yapar.",
                    "speechText": "Proje yönetimi ve İK hesaplarında takvim günleri değil iş günleri önemlidir. TAMİŞGÜNÜ fonksiyonu hafta sonlarını kendiliğinden düşerek net çalışma gününü verir."
          }
],
        tasks: [
          {
                    "id": "t11_3_1",
                    "stepNumber": 1,
                    "instruction": "D2 hücresine \"=TAMİŞGÜNÜ(B2; C2)\" formülünü yazın.",
                    "targetCell": "D2",
                    "hints": [
                              "D2 hücresini seçin.",
                              "=TAMİŞGÜNÜ(B2; C2) yazın.",
                              "Sonuç 11 çıkacaktır."
                    ],
                    "validation": {
                              "targetCell": "D2",
                              "expectedValue": 11,
                              "expectedFormulaKeywords": [
                                        "TAMİŞGÜNÜ",
                                        "NETWORKDAYS"
                              ],
                              "successMessage": "Tebrikler! Net iş günü hesabını başarıyla tamamladınız."
                    }
          }
],
        quiz: {
          "id": "q11_3",
          "title": "TAMİŞGÜNÜ Testi",
          "passingScore": 80,
          "questions": [
                    {
                              "id": "q11_3_1",
                              "question": "TAMİŞGÜNÜ fonksiyonu varsayılan olarak haftanın hangi günlerini tatil kabul eder?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "Yalnızca Pazar"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "Cumartesi ve Pazar"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "Cuma ve Cumartesi"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "Hiçbirini"
                                        }
                              ],
                              "correctOptionId": "b",
                              "explanation": "Standart TAMİŞGÜNÜ fonksiyonu Cumartesi ve Pazar günlerini hafta sonu kabul ederek düşer.",
                              "measuredSkill": "Standart iş günü tatil kuralı"
                    },
                    {
                              "id": "q11_3_extra",
                              "question": "TAMİŞGÜNÜ (NETWORKDAYS) ile Hafta Sonlarını Düşme konusunda Excel in sağladığı temel avantaj nedir?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "Otomatik hesaplama ve dinamik güncelleme"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "Verileri silmesi"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "Yalnızca yazdırma"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "Dosya boyutunu artırma"
                                        }
                              ],
                              "correctOptionId": "a",
                              "explanation": "Excel fonksiyonları formülleri dinamik olarak güncelleyerek manuel iş yükünü ortadan kaldırır.",
                              "measuredSkill": "Temel fonksiyon avantajı"
                    }
          ]
}
      },
      {
        id: "sec11_l4",
        phaseId: 11,
        unitId: "u11_4",
        title: "Bölüm 11 Tarih ve Saat Final Sınavı",
        shortDesc: "BUGÜN, tarih aritmetiği, TAMİŞGÜNÜ ve vade hesaplamaları final sınavı.",
        category: "Tarih ve Saat",
        groupTitle: "Kazanım Değerlendirme",
        primaryGoal: "Bölüm 11 deki tüm tarih ve iş günü kazanımlarını doğrulamak.",
        prerequisites: ["sec11_l1","sec11_l2","sec11_l3"],
        commonMistakes: ["Tarih fonksiyonlarını karıştırmak"],
        successCriteria: "Sınavdan en az %80 alarak Arama ve Başvuru Fonksiyonları bölümüne geçmek.",
        level: "Orta",
        durationMinutes: 12,
        functionsUsed: [],
        initialWorkbook: createTableSheet(undefined, undefined, undefined, undefined),
        objectives: [
          {
                    "id": "o1",
                    "title": "Tarih Ustalığı",
                    "description": "Kurumsal zaman analizlerini hatasız yönetme."
          }
],
        teachingSteps: [
          {
                    "id": "ts1",
                    "title": "Bölüm 11 Finali",
                    "explanation": "Tarih hesaplamalarını tamamladınız. Şimdi final sınavını yanıtlayarak Excel in en popüler konusu olan Arama ve Başvuru Fonksiyonlarına (DÜŞEYARA, ÇAPRAZARA) geçin.",
                    "speechText": "Tarih ve iş günü hesaplarını harika tamamladınız! Şimdi Excel in en ünlü fonksiyonlarına, yani DÜŞEYARA ve ÇAPRAZARA ya geçiyoruz."
          }
],
        tasks: [
          {
                    "id": "t11_4_1",
                    "stepNumber": 1,
                    "instruction": "D2 hücresine \"Tamamlandı\" yazın.",
                    "targetCell": "D2",
                    "hints": [
                              "D2 hücresini seçin.",
                              "Tamamlandı yazın.",
                              "Enter a basın."
                    ],
                    "validation": {
                              "targetCell": "D2",
                              "expectedValue": "Tamamlandı",
                              "successMessage": "Tebrikler! Bölüm 11 final görevini başarıyla tamamladınız."
                    }
          }
],
        quiz: {
          "id": "q11_4",
          "title": "Bölüm 11 Kapsamlı Tarih Sınavı",
          "passingScore": 80,
          "questions": [
                    {
                              "id": "q11_4_1",
                              "question": "Başlangıç tarihi A1 de olan 10 iş günü sürecek bir işin teslimat tarihini veren fonksiyon hangisidir?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "=A1 + 10"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "=İŞGÜNÜ(A1; 10)"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "=TAMİŞGÜNÜ(A1; 10)"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "=GÜN(A1 + 10)"
                                        }
                              ],
                              "correctOptionId": "b",
                              "explanation": "İŞGÜNÜ (WORKDAY) fonksiyonu verilen tarihe belirli sayıda iş günü ekleyerek bitiş tarihini verir.",
                              "measuredSkill": "İŞGÜNÜ termin fonksiyonu"
                    },
                    {
                              "id": "q11_4_extra",
                              "question": "Bölüm 11 Tarih ve Saat Final Sınavı konusunda Excel in sağladığı temel avantaj nedir?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "Otomatik hesaplama ve dinamik güncelleme"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "Verileri silmesi"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "Yalnızca yazdırma"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "Dosya boyutunu artırma"
                                        }
                              ],
                              "correctOptionId": "a",
                              "explanation": "Excel fonksiyonları formülleri dinamik olarak güncelleyerek manuel iş yükünü ortadan kaldırır.",
                              "measuredSkill": "Temel fonksiyon avantajı"
                    }
          ]
}
      }
    ]
  },
  {
    id: 12,
    category: "Arama ve Başvuru",
    title: "12. Arama ve Başvuru Fonksiyonları",
    subtitle: "DÜŞEYARA, YATAYARA, İNDİS, KAÇINCI, modern ÇAPRAZARA ve iki yönlü arama",
    iconName: "Search",
    description: "Excel in en kritik fonksiyonları: DÜŞEYARA (VLOOKUP) söz dizimi, tam ve yaklaşık eşleşme, sütun indeksi kısıtlamaları, İNDİS & KAÇINCI ikilisi ve modern ÇAPRAZARA (XLOOKUP) mimarisi.",
    lessons: [
      {
        id: "sec12_l1",
        phaseId: 12,
        unitId: "u12_1",
        title: "Arama Fonksiyonlarının Amacı ve Tablo Mimarisi",
        shortDesc: "Farklı tablolardaki verileri ortak anahtar (kod, ID, TC No) ile birbiriyle eşleştirme mantığı.",
        category: "Arama ve Başvuru",
        groupTitle: "Arama Temelleri",
        primaryGoal: "İlişkisel veri tablolarında birincil anahtar (Primary Key) ile arama mantığını kavramak.",
        prerequisites: ["sec11_l4"],
        commonMistakes: ["Arama yapılan sütunda yinelenen kayıtlar olduğunu fark etmemek"],
        successCriteria: "Tablo yapısını ve anahtar sütun kavramını anlamak.",
        level: "Orta",
        durationMinutes: 10,
        functionsUsed: [],
        initialWorkbook: createTableSheet(undefined, undefined, undefined, undefined),
        objectives: [
          {
                    "id": "o1",
                    "title": "Arama Kavramı",
                    "description": "Sol sütundaki kod ile sağ sütunlardaki bilgileri eşleştirme."
          }
],
        teachingSteps: [
          {
                    "id": "ts1",
                    "title": "Veri Tabanı Mantığı",
                    "explanation": "İş hayatında binlerce satırlık ana ürün tablosu vardır. Satış faturası keserken sadece \"U101\" kodunu yazarız ve Excel o ürünün adını ve fiyatını ana tablodan otomatik çeker.",
                    "speechText": "Arama fonksiyonları Excel in en çok kullanılan araçlarıdır. Bir ürün kodu veya müşteri numarası verip o kişinin adını, telefonunu veya borcunu başka bir tablodan anında çekeriz."
          }
],
        tasks: [
          {
                    "id": "t12_1_1",
                    "stepNumber": 1,
                    "instruction": "E2 hücresine \"Kavrandı\" yazın.",
                    "targetCell": "E2",
                    "hints": [
                              "E2 hücresini seçin.",
                              "Kavrandı yazın.",
                              "Enter a basın."
                    ],
                    "validation": {
                              "targetCell": "E2",
                              "expectedValue": "Kavrandı",
                              "successMessage": "Harika! Arama mimarisi temelini tamamladınız."
                    }
          }
],
        quiz: {
          "id": "q12_1",
          "title": "Arama Mimarisi Testi",
          "passingScore": 80,
          "questions": [
                    {
                              "id": "q12_1_1",
                              "question": "DÜŞEYARA fonksiyonunun aranacak değeri bulabilmesi için tablo aralığının ilk sütunu ne olmalıdır?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "En yüksek fiyat sütunu"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "Aranan anahtar değerin (kod, ID) bulunduğu sütun"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "Her zaman A sütunu"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "Tarih sütunu"
                                        }
                              ],
                              "correctOptionId": "b",
                              "explanation": "DÜŞEYARA kesin bir kurala sahiptir: Aranan değer seçilen tablo aralığının her zaman en solundaki 1. sütununda yer almalıdır.",
                              "measuredSkill": "DÜŞEYARA ilk sütun kuralı"
                    },
                    {
                              "id": "q12_1_extra",
                              "question": "Arama Fonksiyonlarının Amacı ve Tablo Mimarisi uygulamasında formül hatası almamak için neye dikkat edilmelidir?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "Argüman sıralamasına ve noktalı virgül (;) ayracına"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "Hücreyi sarıya boyamaya"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "Yazı tipini büyütmeye"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "Tabloyu kapatmaya"
                                        }
                              ],
                              "correctOptionId": "a",
                              "explanation": "Excel formüllerinde argümanların doğru sırada girilmesi ve noktalı virgül ayracı kritik önem taşır.",
                              "measuredSkill": "Formül sözdizimi doğruluğu"
                    }
          ]
}
      },
      {
        id: "sec12_l2",
        phaseId: 12,
        unitId: "u12_2",
        title: "DÜŞEYARA (VLOOKUP) Söz Dizimi ve 4 Parametrenin Anlamı",
        shortDesc: "Aranan Değer, Tablo Dizisi, Sütun İndis Sayısı ve Aralık Arama (YANLIŞ/0) anatomisi.",
        category: "Arama ve Başvuru",
        groupTitle: "DÜŞEYARA",
        primaryGoal: "=DÜŞEYARA(aranan; tablo; sütun_no; 0) söz dizimiyle tam eşleşme arama yapmak.",
        prerequisites: ["sec12_l1"],
        commonMistakes: ["4. parametreye YANLIŞ veya 0 yazmayı unutmak (bu durumda yaklaşık eşleşme yapıp tamamen yanlış satırı getirir!)"],
        successCriteria: "DÜŞEYARA formülüyle ürün fiyatını doğru çekmek.",
        level: "Orta",
        durationMinutes: 15,
        functionsUsed: ["DÜŞEYARA"],
        initialWorkbook: createTableSheet(undefined, undefined, undefined, undefined),
        objectives: [
          {
                    "id": "o1",
                    "title": "DÜŞEYARA Anatomisi",
                    "description": "4 parametreyi eksiksiz tanımlayıp tam eşleşmeyle veri çekme."
          }
],
        teachingSteps: [
          {
                    "id": "ts1",
                    "title": "DÜŞEYARA nın 4 Adımı",
                    "explanation": "=DÜŞEYARA(B5; A2:C4; 3; YANLIŞ). 1: Neyi arıyorsun? (B5 deki 1002 yi). 2: Nerede arıyorsun? (A2:C4 tablosunda). 3: Kaçıncı sütundaki veriyi istiyorsun? (3. sütundaki Fiyatı). 4: Tam mı arasın? (YANLIŞ veya 0).",
                    "speechText": "DÜŞEYARA nın 4 parametresi vardır: Aranan değer, tablonun tamamı, getirilecek sütunun numarası ve tam eşleşme için YANLIŞ parametresi. Dördüncü parametreyi asla unutmayın!"
          }
],
        tasks: [
          {
                    "id": "t12_2_1",
                    "stepNumber": 1,
                    "instruction": "C5 hücresine \"=DÜŞEYARA(B5; A2:C4; 3; YANLIŞ)\" formülünü yazarak 1002 kodlu ürünün fiyatını çekin.",
                    "targetCell": "C5",
                    "hints": [
                              "C5 hücresini seçin.",
                              "=DÜŞEYARA(B5; A2:C4; 3; YANLIŞ) yazın.",
                              "1002 kodlu Monitörün fiyatı 6500 olarak gelecektir."
                    ],
                    "validation": {
                              "targetCell": "C5",
                              "expectedValue": 6500,
                              "expectedFormulaKeywords": [
                                        "DÜŞEYARA",
                                        "VLOOKUP"
                              ],
                              "successMessage": "Tebrikler! DÜŞEYARA ile tam eşleşme aramasını başarıyla gerçekleştirdiniz."
                    }
          }
],
        quiz: {
          "id": "q12_2",
          "title": "DÜŞEYARA Temel Testi",
          "passingScore": 80,
          "questions": [
                    {
                              "id": "q12_2_1",
                              "question": "DÜŞEYARA fonksiyonunda 4. parametre olan [aralık_bak] kısmına \"YANLIŞ\" (veya 0) yazılmasının sebebi nedir?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "Hata verirse sıfır yazması için"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "Birebir tam eşleşme aramak için"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "Büyük küçük harfe duyarlı yapmak için"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "Sütun sayısını belirlemek için"
                                        }
                              ],
                              "correctOptionId": "b",
                              "explanation": "YANLIŞ (veya 0) parametresi tam eşleşme (Exact Match) yapılmasını emreder.",
                              "measuredSkill": "DÜŞEYARA tam eşleşme parametresi"
                    },
                    {
                              "id": "q12_2_extra",
                              "question": "DÜŞEYARA (VLOOKUP) Söz Dizimi ve 4 Parametrenin Anlamı uygulamasında formül hatası almamak için neye dikkat edilmelidir?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "Argüman sıralamasına ve noktalı virgül (;) ayracına"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "Hücreyi sarıya boyamaya"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "Yazı tipini büyütmeye"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "Tabloyu kapatmaya"
                                        }
                              ],
                              "correctOptionId": "a",
                              "explanation": "Excel formüllerinde argümanların doğru sırada girilmesi ve noktalı virgül ayracı kritik önem taşır.",
                              "measuredSkill": "Formül sözdizimi doğruluğu"
                    }
          ]
}
      },
      {
        id: "sec12_l3",
        phaseId: 12,
        unitId: "u12_3",
        title: "DÜŞEYARA'da Yaklaşık Eşleşme (DOĞRU / 1) ile Komisyon ve Vergi Skalası",
        shortDesc: "Aralıklı tablolarda (Örn: 0-10 bin arası %2, 10-50 bin arası %5) yaklaşık eşleşme mantığı.",
        category: "Arama ve Başvuru",
        groupTitle: "Yaklaşık Eşleşme",
        primaryGoal: "Artan sırada sıralı barem tablolarında DOĞRU (1) kullanarak barem aralığı bulmak.",
        prerequisites: ["sec12_l2"],
        commonMistakes: ["Barem tablosunu küçükten büyüğe sıralamayı unutmak (yaklaşık eşleşmede tablo mutlaka A-Z sıralı olmalıdır!)"],
        successCriteria: "Yaklaşık eşleşme ile doğru komisyon oranını çekmek.",
        level: "İleri",
        durationMinutes: 14,
        functionsUsed: ["DÜŞEYARA"],
        initialWorkbook: createTableSheet(undefined, undefined, undefined, undefined),
        objectives: [
          {
                    "id": "o1",
                    "title": "Yaklaşık Eşleşme Mantığı",
                    "description": "Değerden küçük veya eşit en büyük baremi bulma."
          }
],
        teachingSteps: [
          {
                    "id": "ts1",
                    "title": "Barem Tabloları",
                    "explanation": "35000 TL ciro yapan biri tabloda tam olarak bulunamaz. Excel 4. parametreye DOĞRU (veya 1) yazdığınızda 35000 den küçük en yakın barem olan 20000 satırını yakalar ve %5 (%0.05) oranını getirir.",
                    "speechText": "Vergi dilimleri veya prim baremlerinde yaklaşık eşleşme kullanırız. Tablonuz küçükten büyüğe sıralı olmalı ve 4. parametreye 1 yazmalısınız."
          }
],
        tasks: [
          {
                    "id": "t12_3_1",
                    "stepNumber": 1,
                    "instruction": "C6 hücresine \"=DÜŞEYARA(B6; A2:B5; 2; DOĞRU)\" formülünü yazın.",
                    "targetCell": "C6",
                    "hints": [
                              "C6 hücresini seçin.",
                              "=DÜŞEYARA(B6; A2:B5; 2; DOĞRU) yazın.",
                              "35000 cirosu için 20000 baremi devreye girer ve sonuç 0.08 (%8) veya 0.05 (%5) olacaktır."
                    ],
                    "validation": {
                              "targetCell": "C6",
                              "expectedValue": 0.05,
                              "expectedFormulaKeywords": [
                                        "DÜŞEYARA",
                                        "VLOOKUP"
                              ],
                              "successMessage": "Harika! Barem tablosunda yaklaşık eşleşmeyi başarıyla uyguladınız."
                    }
          }
],
        quiz: {
          "id": "q12_3",
          "title": "Yaklaşık Eşleşme Testi",
          "passingScore": 80,
          "questions": [
                    {
                              "id": "q12_3_1",
                              "question": "DÜŞEYARA da yaklaşık eşleşme (DOĞRU/1) kullanılırken tablonun ilk sütunu nasıl sıralanmış olmalıdır?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "Büyükten küçüğe (Z-A)"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "Küçükten büyüğe (A-Z / Artan sırada)"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "Sırasız olabilir"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "Metin uzunluğuna göre"
                                        }
                              ],
                              "correctOptionId": "b",
                              "explanation": "Yaklaşık eşleşmede Excel ikili arama algoritması çalıştırır; bu nedenle ilk sütunun mutlak surette küçükten büyüğe sıralı olması şarttır.",
                              "measuredSkill": "Yaklaşık eşleşme sıralama ön koşulu"
                    },
                    {
                              "id": "q12_3_extra",
                              "question": "DÜŞEYARA'da Yaklaşık Eşleşme (DOĞRU / 1) ile Komisyon ve Vergi Skalası uygulamasında formül hatası almamak için neye dikkat edilmelidir?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "Argüman sıralamasına ve noktalı virgül (;) ayracına"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "Hücreyi sarıya boyamaya"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "Yazı tipini büyütmeye"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "Tabloyu kapatmaya"
                                        }
                              ],
                              "correctOptionId": "a",
                              "explanation": "Excel formüllerinde argümanların doğru sırada girilmesi ve noktalı virgül ayracı kritik önem taşır.",
                              "measuredSkill": "Formül sözdizimi doğruluğu"
                    }
          ]
}
      },
      {
        id: "sec12_l4",
        phaseId: 12,
        unitId: "u12_4",
        title: "İNDİS (INDEX) ve KAÇINCI (MATCH) ile Sol Yönlü ve Esnek Arama",
        shortDesc: "DÜŞEYARA nın sola arayamama ve sütun eklenince bozulma kısıtlamalarını aşma.",
        category: "Arama ve Başvuru",
        groupTitle: "İNDİS ve KAÇINCI",
        primaryGoal: "DÜŞEYARA nın yerine dinamik ve kırılmaz İNDİS & KAÇINCI ikilisini kurabilmek.",
        prerequisites: ["sec12_l3"],
        commonMistakes: ["İNDİS ile KAÇINCI nın aralıklarını birbiriyle karıştırmak"],
        successCriteria: "İNDİS ve KAÇINCI kombinasyonu ile sola arama yapmak.",
        level: "İleri",
        durationMinutes: 15,
        functionsUsed: ["İNDİS","KAÇINCI"],
        initialWorkbook: createTableSheet(undefined, undefined, undefined, undefined),
        objectives: [
          {
                    "id": "o1",
                    "title": "İNDİS & KAÇINCI Mimarisi",
                    "description": "KAÇINCI ile satır numarasını bulup İNDİS e aktarma."
          }
],
        teachingSteps: [
          {
                    "id": "ts1",
                    "title": "DÜŞEYARA Neden Sola Arayamaz?",
                    "explanation": "ID sütunu sağda (C de), aradığımız Personel Adı ise solda (A da). DÜŞEYARA sola arayamaz! İNDİS ve KAÇINCI ise bağımsız aralıklara bakar: =İNDİS(A2:A4; KAÇINCI(B5; C2:C4; 0)).",
                    "speechText": "DÜŞEYARA nın en zayıf yönü solundaki sütunları arayamamasıdır. İNDİS ve KAÇINCI ikilisi tablo düzeni ne olursa olsun, sağa veya sola bakmaksızın mükemmel arama yapar."
          }
],
        tasks: [
          {
                    "id": "t12_4_1",
                    "stepNumber": 1,
                    "instruction": "C5 hücresine \"=İNDİS(A2:A4; KAÇINCI(B5; C2:C4; 0))\" formülünü yazarak P-102 ID li personelin adını bulun.",
                    "targetCell": "C5",
                    "hints": [
                              "C5 hücresini seçin.",
                              "=İNDİS(A2:A4; KAÇINCI(B5; C2:C4; 0)) yazın.",
                              "P-102 için sonuç \"Burak Yıldız\" çıkacaktır."
                    ],
                    "validation": {
                              "targetCell": "C5",
                              "expectedValue": "Burak Yıldız",
                              "expectedFormulaKeywords": [
                                        "İNDİS",
                                        "KAÇINCI",
                                        "INDEX",
                                        "MATCH"
                              ],
                              "successMessage": "Tebrikler! İNDİS & KAÇINCI ile sol yönlü aramayı kusursuz çözdünüz."
                    }
          }
],
        quiz: {
          "id": "q12_4",
          "title": "İNDİS & KAÇINCI Testi",
          "passingScore": 80,
          "questions": [
                    {
                              "id": "q12_4_1",
                              "question": "KAÇINCI (MATCH) fonksiyonunun tek başına görevi nedir?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "Değerin kendisini döndürmek"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "Aranan değerin belirtilen aralıktaki sıra numarasını (kaçıncı sırada olduğunu) bulmak"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "Hücreyi silmek"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "Ortalama hesaplamak"
                                        }
                              ],
                              "correctOptionId": "b",
                              "explanation": "KAÇINCI fonksiyonu aranan elemanın listede kaçıncı sırada (1, 2, 3..) olduğunu döner.",
                              "measuredSkill": "KAÇINCI fonksiyonunun görevi"
                    },
                    {
                              "id": "q12_4_extra",
                              "question": "İNDİS (INDEX) ve KAÇINCI (MATCH) ile Sol Yönlü ve Esnek Arama uygulamasında formül hatası almamak için neye dikkat edilmelidir?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "Argüman sıralamasına ve noktalı virgül (;) ayracına"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "Hücreyi sarıya boyamaya"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "Yazı tipini büyütmeye"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "Tabloyu kapatmaya"
                                        }
                              ],
                              "correctOptionId": "a",
                              "explanation": "Excel formüllerinde argümanların doğru sırada girilmesi ve noktalı virgül ayracı kritik önem taşır.",
                              "measuredSkill": "Formül sözdizimi doğruluğu"
                    }
          ]
}
      },
      {
        id: "sec12_l5",
        phaseId: 12,
        unitId: "u12_5",
        title: "Modern ÇAPRAZARA (XLOOKUP) ile Sol Yönlü ve Dinamik Arama",
        shortDesc: "DÜŞEYARA yı tarihe gömen modern ÇAPRAZARA: Sütun numarası saymaya son, sola arama ve dahili hata yönetimi.",
        category: "Arama ve Başvuru",
        groupTitle: "ÇAPRAZARA Fonksiyonu",
        primaryGoal: "=ÇAPRAZARA(aranan; arama_aralığı; döndürülen_aralık) ile en modern arama standardını uygulamak.",
        prerequisites: ["sec12_l4"],
        commonMistakes: ["Eski alışkanlıkla sütun indeksi sayısı yazmaya çalışmak (ÇAPRAZARA doğrudan aralık alır!)"],
        successCriteria: "ÇAPRAZARA fonksiyonuyla sola doğru ürün adını başarıyla çekmek.",
        level: "İleri",
        durationMinutes: 15,
        functionsUsed: ["ÇAPRAZARA"],
        initialWorkbook: createTableSheet(undefined, undefined, undefined, undefined),
        objectives: [
          {
                    "id": "o1",
                    "title": "ÇAPRAZARA Mimarisi",
                    "description": "Aranan aralık ile dönen aralığın bağımsız seçimi ve sola arama."
          }
],
        teachingSteps: [
          {
                    "id": "ts1",
                    "title": "Excel in Yeni Kralı: ÇAPRAZARA",
                    "explanation": "ÇAPRAZARA da sütun saymak yok, varsayılan olarak tam eşleşir (0 yazmak gerekmez), sola ve sağa serbestçe bakar! Formül: =ÇAPRAZARA(B5; B2:B4; A2:A4).",
                    "speechText": "Modern Excel in en güçlü fonksiyonu ÇAPRAZARA dır. DÜŞEYARA nın tüm eksiklerini kapatır; sola arar, sütun eklenince bozulmaz ve hata vermez."
          }
],
        tasks: [
          {
                    "id": "t12_5_1",
                    "stepNumber": 1,
                    "instruction": "C5 hücresine \"=ÇAPRAZARA(B5; B2:B4; A2:A4)\" formülünü yazarak barkoddan ürün adını çekin.",
                    "targetCell": "C5",
                    "hints": [
                              "C5 hücresini seçin.",
                              "=ÇAPRAZARA(B5; B2:B4; A2:A4) yazın.",
                              "869002 barkodu için sonuç \"Kablosuz Mouse\" olmalıdır."
                    ],
                    "validation": {
                              "targetCell": "C5",
                              "expectedValue": "Kablosuz Mouse",
                              "expectedFormulaKeywords": [
                                        "ÇAPRAZARA",
                                        "XLOOKUP"
                              ],
                              "successMessage": "Tebrikler! Modern ÇAPRAZARA ile sola doğru aramayı başardınız."
                    }
          }
],
        quiz: {
          "id": "q12_5",
          "title": "ÇAPRAZARA Testi",
          "passingScore": 80,
          "questions": [
                    {
                              "id": "q12_5_1",
                              "question": "ÇAPRAZARA nın DÜŞEYARA ya göre en büyük avantajlarından biri nedir?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "Yalnızca sayıları arayabilmesi"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "Arama sütununun solundaki verileri de kolayca getirebilmesi ve varsayılan olarak tam eşleşme yapması"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "Daha az harfle yazılması"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "Sadece 10 satırda çalışması"
                                        }
                              ],
                              "correctOptionId": "b",
                              "explanation": "ÇAPRAZARA hem sola hem sağa arayabilir ve DÜŞEYARA gibi 0 yazmayı zorunlu kılmaz.",
                              "measuredSkill": "ÇAPRAZARA üstünlükleri"
                    },
                    {
                              "id": "q12_5_extra",
                              "question": "Modern ÇAPRAZARA (XLOOKUP) ile Sol Yönlü ve Dinamik Arama uygulamasında formül hatası almamak için neye dikkat edilmelidir?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "Argüman sıralamasına ve noktalı virgül (;) ayracına"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "Hücreyi sarıya boyamaya"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "Yazı tipini büyütmeye"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "Tabloyu kapatmaya"
                                        }
                              ],
                              "correctOptionId": "a",
                              "explanation": "Excel formüllerinde argümanların doğru sırada girilmesi ve noktalı virgül ayracı kritik önem taşır.",
                              "measuredSkill": "Formül sözdizimi doğruluğu"
                    }
          ]
}
      },
      {
        id: "sec12_l6",
        phaseId: 12,
        unitId: "u12_6",
        title: "Bölüm 12 Arama ve Başvuru Final Sınavı",
        shortDesc: "DÜŞEYARA, yaklaşık eşleşme, İNDİS, KAÇINCI ve ÇAPRAZARA kapsamlı bitirme sınavı.",
        category: "Arama ve Başvuru",
        groupTitle: "Kazanım Değerlendirme",
        primaryGoal: "Bölüm 12 deki tüm arama ve başvuru mimarisi kazanımlarını doğrulamak.",
        prerequisites: ["sec12_l1","sec12_l2","sec12_l3","sec12_l4","sec12_l5"],
        commonMistakes: ["Arama fonksiyonlarının doğru kullanım yerlerini ayırt edememek"],
        successCriteria: "Sınavdan en az %80 alarak Dinamik Diziler bölümüne geçmek.",
        level: "İleri",
        durationMinutes: 15,
        functionsUsed: [],
        initialWorkbook: createTableSheet(undefined, undefined, undefined, undefined),
        objectives: [
          {
                    "id": "o1",
                    "title": "Arama Fonksiyonları Ustalığı",
                    "description": "İş problemine en uygun arama fonksiyonunu seçip kurgulama."
          }
],
        teachingSteps: [
          {
                    "id": "ts1",
                    "title": "Bölüm 12 Final Değerlendirmesi",
                    "explanation": "Excel in en prestijli bölümünü tamamladınız! Şimdi sınavı yanıtlayarak Dinamik Dizi Formülleri (BENZERSİZ, SIRALA, FİLTRELE) bölümüne geçin.",
                    "speechText": "Arama ve başvuru fonksiyonlarında tam bir uzman oldunuz. Final sınavını çözüp dinamik diziler dünyasına geçelim."
          }
],
        tasks: [
          {
                    "id": "t12_6_1",
                    "stepNumber": 1,
                    "instruction": "E2 hücresine \"Tamamlandı\" yazın.",
                    "targetCell": "E2",
                    "hints": [
                              "E2 hücresini seçin.",
                              "Tamamlandı yazın.",
                              "Enter a basın."
                    ],
                    "validation": {
                              "targetCell": "E2",
                              "expectedValue": "Tamamlandı",
                              "successMessage": "Tebrikler! Bölüm 12 final görevini başarıyla tamamladınız."
                    }
          }
],
        quiz: {
          "id": "q12_6",
          "title": "Bölüm 12 Kapsamlı Arama Sınavı",
          "passingScore": 80,
          "questions": [
                    {
                              "id": "q12_6_1",
                              "question": "Aşağıdaki durumlardan hangisinde DÜŞEYARA yerine ÇAPRAZARA veya İNDİS&KAÇINCI kullanmak ZORUNLUDUR?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "Aranan anahtar sütun, getirilmek istenen bilgi sütununun SAĞINDA yer aldığında"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "Tabloda 10 dan fazla satır olduğunda"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "Sayı arandığında"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "Tablo aynı sayfada olduğunda"
                                        }
                              ],
                              "correctOptionId": "a",
                              "explanation": "DÜŞEYARA aranan sütunun solunda kalan verileri çekemez; sol yönlü aramalarda ÇAPRAZARA veya İNDİS&KAÇINCI şarttır.",
                              "measuredSkill": "Arama fonksiyonu kısıt analizi"
                    },
                    {
                              "id": "q12_6_extra",
                              "question": "Bölüm 12 Arama ve Başvuru Final Sınavı uygulamasında formül hatası almamak için neye dikkat edilmelidir?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "Argüman sıralamasına ve noktalı virgül (;) ayracına"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "Hücreyi sarıya boyamaya"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "Yazı tipini büyütmeye"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "Tabloyu kapatmaya"
                                        }
                              ],
                              "correctOptionId": "a",
                              "explanation": "Excel formüllerinde argümanların doğru sırada girilmesi ve noktalı virgül ayracı kritik önem taşır.",
                              "measuredSkill": "Formül sözdizimi doğruluğu"
                    }
          ]
}
      }
    ]
  },
  {
    id: 13,
    category: "Dinamik Diziler",
    title: "13. Dinamik Diziler ve İleri Formüller",
    subtitle: "BENZERSİZ, SIRALA, FİLTRE, taşma (#TAŞMA!) ve # yayılım operatörü",
    iconName: "Layers",
    description: "Excel in yeni nesil dinamik dizi motoruyla tek formülle yüzlerce hücreye sonuç yayma (Spill), otomatik tekilleştirme, canlı sıralama ve çok kriterli filtreleme formülleri.",
    lessons: [
      {
        id: "sec13_l1",
        phaseId: 13,
        unitId: "u13_1",
        title: "BENZERSİZ (UNIQUE) ile Tekil Listeler Üretme",
        shortDesc: "Yüzlerce tekrarlayan kaydın içinden tekil elemanları tek bir formülle dinamik listeleme.",
        category: "Dinamik Diziler",
        groupTitle: "BENZERSİZ Fonksiyonu",
        primaryGoal: "=BENZERSİZ(aralık) formülüyle yinelenen kayıtları anında tekilleştirmek.",
        prerequisites: ["sec12_l6"],
        commonMistakes: ["Sonucun yayılacağı hücrelerin dolu olması nedeniyle #TAŞMA! (#SPILL!) hatası almak"],
        successCriteria: "BENZERSİZ fonksiyonuyla tekil listeyi üretmek.",
        level: "İleri",
        durationMinutes: 14,
        functionsUsed: ["BENZERSİZ"],
        initialWorkbook: createTableSheet("s13_1", "BenzersizListe", ["Müşteri Şehri","Tekil Şehirler"], [["İstanbul",""],["Ankara",""],["İstanbul",""],["İzmir",""],["Ankara",""]]),
        objectives: [
          {
                    "id": "o1",
                    "title": "BENZERSİZ Söz Dizimi",
                    "description": "=BENZERSİZ(A2:A6) ile taşan dinamik dizi üretme."
          }
],
        teachingSteps: [
          {
                    "id": "ts1",
                    "title": "Dinamik Dizi Taşması",
                    "explanation": "Eski Excel de tek hücreye tek sonuç dönerdi. BENZERSİZ fonksiyonunu B2 ye yazdığınızda, Excel alta doğru otomatik taşar ve İstanbul, Ankara, İzmir listesini oluşturur.",
                    "speechText": "BENZERSİZ fonksiyonu dinamik dizi formüllerinin en güzel örneğidir. Tek bir hücreye yazarsınız, Excel tüm tekil elemanları alt alta kendiliğinden döker."
          }
],
        tasks: [
          {
                    "id": "t13_1_1",
                    "stepNumber": 1,
                    "instruction": "B2 hücresine \"=BENZERSİZ(A2:A6)\" formülünü yazın.",
                    "targetCell": "B2",
                    "hints": [
                              "B2 hücresini seçin.",
                              "=BENZERSİZ(A2:A6) yazın.",
                              "Sonuç taşarak tekil şehirleri listeleyecektir."
                    ],
                    "validation": {
                              "targetCell": "B2",
                              "expectedFormulaKeywords": [
                                        "BENZERSİZ",
                                        "UNIQUE"
                              ],
                              "successMessage": "Tebrikler! BENZERSİZ fonksiyonuyla tekil listeyi oluşturdunuz."
                    }
          }
],
        quiz: {
          "id": "q13_1",
          "title": "BENZERSİZ Testi",
          "passingScore": 80,
          "questions": [
                    {
                              "id": "q13_1_1",
                              "question": "Dinamik dizi formüllerinde taşma alanında dolu bir hücre varsa Excel hangi hatayı verir?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "#DEĞER!"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "#TAŞMA! (#SPILL!)"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "#BAŞV!"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "#YOK"
                                        }
                              ],
                              "correctOptionId": "b",
                              "explanation": "Dinamik dizinin yayılacağı yolda dolu bir hücre veya engel varsa #TAŞMA! hatası döner.",
                              "measuredSkill": "#TAŞMA! hatası sebebi"
                    },
                    {
                              "id": "q13_1_2",
                              "question": "BENZERSİZ fonksiyonunun ikinci parametresi olan [by_col] varsayılan olarak ne yapar?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "Satırlara göre benzersizleri arar"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "Sütunlara göre benzersizleri arar"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "Tüm tabloyu siler"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "Yalnızca sayıları alır"
                                        }
                              ],
                              "correctOptionId": "a",
                              "explanation": "Varsayılan olarak satırları karşılaştırarak tekilleştirir.",
                              "measuredSkill": "BENZERSİZ parametre yapısı"
                    }
          ]
}
      },
      {
        id: "sec13_l2",
        phaseId: 13,
        unitId: "u13_2",
        title: "SIRALA (SORT) Fonksiyonu ile Dinamik Sıralama",
        shortDesc: "Orijinal veriyi bozmadan formülle A-Z veya büyükten küçüğe sıralı liste oluşturma.",
        category: "Dinamik Diziler",
        groupTitle: "SIRALA Fonksiyonu",
        primaryGoal: "=SIRALA(aralık; sıralama_dizini; sıralama_düzeni) ile otomatik sıralı tablo üretmek.",
        prerequisites: ["sec13_l1"],
        commonMistakes: ["Sıralama düzeni parametresine azalan sıra için -1 yazmayı unutmak"],
        successCriteria: "SIRALA formülüyle ciroları büyükten küçüğe dizmek.",
        level: "İleri",
        durationMinutes: 14,
        functionsUsed: ["SIRALA"],
        initialWorkbook: createTableSheet("s13_2", "CanlıSıralama", ["Temsilci","Bölge","Satış (TL)","Sıralı Temsilci"], [["Ali Vural","Ege",45000,""],["Deniz Kaya","Marmara",92000,""],["Cemil Ak","İç Anadolu",61000,""]]),
        objectives: [
          {
                    "id": "o1",
                    "title": "SIRALA Formülü",
                    "description": "=SIRALA(A2:C4; 3; -1) ile satışa göre azalan sıralama."
          }
],
        teachingSteps: [
          {
                    "id": "ts1",
                    "title": "Canlı Formülle Sıralama",
                    "explanation": "Excel de Veri sekmesindeki Sırala düğmesi sabittir. Ancak SIRALA formülüyle oluşturduğunuz liste, orijinal verideki bir sayı değiştiği anda saniyesinde kendini yeniden sıralar!",
                    "speechText": "SIRALA fonksiyonu orijinal tablonuza dokunmadan dinamik olarak sıralı bir kopya üretir. 3. parametreye -1 vererek büyükten küçüğe sıralayabilirsiniz."
          }
],
        tasks: [
          {
                    "id": "t13_2_1",
                    "stepNumber": 1,
                    "instruction": "D2 hücresine \"=SIRALA(A2:C4; 3; -1)\" formülünü yazarak cirosu en yüksek olanı en üste getirin.",
                    "targetCell": "D2",
                    "hints": [
                              "D2 hücresini seçin.",
                              "=SIRALA(A2:C4; 3; -1) yazın.",
                              "3. sütun Satış tır, -1 azalan sıra demektir."
                    ],
                    "validation": {
                              "targetCell": "D2",
                              "expectedFormulaKeywords": [
                                        "SIRALA",
                                        "SORT"
                              ],
                              "successMessage": "Harika! Dinamik SIRALA formülü başarıyla çalıştı."
                    }
          }
],
        quiz: {
          "id": "q13_2",
          "title": "SIRALA Testi",
          "passingScore": 80,
          "questions": [
                    {
                              "id": "q13_2_1",
                              "question": "SIRALA fonksiyonunda verileri büyükten küçüğe (azalan sırada) dizmek için 3. parametreye ne yazılır?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "1"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "-1"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "0"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "AZALAN"
                                        }
                              ],
                              "correctOptionId": "b",
                              "explanation": "1 artan (küçükten büyüğe / A-Z), -1 azalan (büyükten küçüğe / Z-A) sıralama yapar.",
                              "measuredSkill": "SIRALA sıralama yönü kuralı"
                    },
                    {
                              "id": "q13_2_2",
                              "question": "SIRALA ve BENZERSİZ fonksiyonları iç içe kullanılabilir mi?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "Evet, =SIRALA(BENZERSİZ(A2:A100)) şeklinde tekil ve sıralı liste elde edilir"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "Hayır, Excel dinamik dizileri iç içe kabul etmez"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "Yalnızca makro ile yapılabilir"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "Sadece sayılarda çalışır"
                                        }
                              ],
                              "correctOptionId": "a",
                              "explanation": "Dinamik dizi formülleri mükemmel biçimde iç içe geçebilir.",
                              "measuredSkill": "Dinamik dizi kompozisyonu"
                    }
          ]
}
      },
      {
        id: "sec13_l3",
        phaseId: 13,
        unitId: "u13_3",
        title: "FİLTRE (FILTER) ile Canlı Şartlı Veri Listeleme",
        shortDesc: "Belirli bir şartı sağlayan tüm satırları otomatik olarak başka bir alana aktarma.",
        category: "Dinamik Diziler",
        groupTitle: "FİLTRE Fonksiyonu",
        primaryGoal: "=FİLTRE(dizi; ekle; [boşsa]) formülüyle hedef kriteri sağlayan kayıtları dinamik süzmek.",
        prerequisites: ["sec13_l2"],
        commonMistakes: ["Ekle koşulunda eşitlik şartını yanlış aralıkla kıyaslamak"],
        successCriteria: "FİLTRE fonksiyonuyla cirosu 50000 den büyük kayıtları listelemek.",
        level: "İleri",
        durationMinutes: 16,
        functionsUsed: ["FİLTRE"],
        initialWorkbook: createTableSheet("s13_3", "CanlıFiltre", ["Müşteri","Şehir","Tutar","Filtrelenenler"], [["Beta Ltd","İzmir",75000,""],["Alfa A.Ş.","İstanbul",32000,""],["Gama Ltd","Ankara",88000,""]]),
        objectives: [
          {
                    "id": "o1",
                    "title": "FİLTRE Mimarisi",
                    "description": "=FİLTRE(A2:C4; C2:C4>50000; \"Kayıt Yok\") formülü."
          }
],
        teachingSteps: [
          {
                    "id": "ts1",
                    "title": "Canlı Filtreleme Sihri",
                    "explanation": "FİLTRE fonksiyonu belirtilen mantıksal şarta uyan satırları dinamik olarak çıkarır. Orijinal tablodaki tutar 50000 in üstüne çıktığı an filtrelenmiş alana kendiliğinden eklenir.",
                    "speechText": "FİLTRE fonksiyonu yeni nesil Excel in en devrimci aracıdır. Tek satırlık formülle koşulu sağlayan tüm satırları başka bir sayfaya veya hücreye dökebilirsiniz."
          }
],
        tasks: [
          {
                    "id": "t13_3_1",
                    "stepNumber": 1,
                    "instruction": "D2 hücresine \"=FİLTRE(A2:C4; C2:C4>50000; \"Kayıt Yok\")\" formülünü yazarak 50000 TL üzerindeki siparişleri süzün.",
                    "targetCell": "D2",
                    "hints": [
                              "D2 hücresini seçin.",
                              "=FİLTRE(A2:C4; C2:C4>50000; \"Kayıt Yok\") yazın.",
                              "Beta Ltd ve Gama Ltd satırları gelecektir."
                    ],
                    "validation": {
                              "targetCell": "D2",
                              "expectedFormulaKeywords": [
                                        "FİLTRE",
                                        "FILTER"
                              ],
                              "successMessage": "Tebrikler! FİLTRE fonksiyonuyla canlı veri çekmeyi başardınız."
                    }
          }
],
        quiz: {
          "id": "q13_3",
          "title": "FİLTRE Fonksiyonu Testi",
          "passingScore": 80,
          "questions": [
                    {
                              "id": "q13_3_1",
                              "question": "FİLTRE fonksiyonunda aranan kritere uyan hiçbir kayıt bulunamazsa #HESAPLA! hatası yerine özel mesaj göstermek için ne yapılır?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "3. parametre olan [if_empty] kısmına \"Kayıt Yok\" yazılır"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "EĞERHATA formülüyle sarılır"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "Bilgisayar yeniden başlatılır"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "Filtre silinir"
                                        }
                              ],
                              "correctOptionId": "a",
                              "explanation": "FİLTRE fonksiyonunun dahili 3. parametresi ([boşsa]) bulunamayan kayıt durumunda dönecek değeri belirler.",
                              "measuredSkill": "FİLTRE boş durum yönetimi"
                    },
                    {
                              "id": "q13_3_2",
                              "question": "FİLTRE formülünde aynı anda iki koşulu (Örn: Hem Şehir=\"İstanbul\" VE Tutar>10000) aramak için koşullar arasına hangi sembol konur?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "* (Çarpı işareti ile mantıksal VE)"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "+ (Artı işareti ile mantıksal YADA)"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "& (Ve işareti)"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "; (Noktalı virgül)"
                                        }
                              ],
                              "correctOptionId": "a",
                              "explanation": "Dizi formüllerinde (Aralık1=Koşul1)*(Aralık2=Koşul2) çarpımı mantıksal VE (AND) işlemidir.",
                              "measuredSkill": "Dinamik dizilerde Boole mantığı"
                    }
          ]
}
      },
      {
        id: "sec13_l4",
        phaseId: 13,
        unitId: "u13_4",
        title: "Taşma Başvurusu (#) ile Dinamik Toplam ve Entegrasyon",
        shortDesc: "Taşan bir formülün tüm aralığını A2# yazarak diğer fonksiyonlara tek adımda bağlama.",
        category: "Dinamik Diziler",
        groupTitle: "Taşma Operatörü (#)",
        primaryGoal: "A2# sözdizimi ile taşan dinamik diziyi TOPLA, EĞERSAY veya DÜŞEYARA ya referans vermek.",
        prerequisites: ["sec13_l3"],
        commonMistakes: ["# işaretini hücre adresinin önüne yazmak ($ gibi sanmak, oysa adresin SONUNA yazılır: B2#)"],
        successCriteria: "Dinamik dizi aralığını # ile toplayabilmek.",
        level: "İleri",
        durationMinutes: 12,
        functionsUsed: ["TOPLA"],
        initialWorkbook: createTableSheet("s13_4", "TaşmaOperatörü", ["Ham Değer","Tekiller (Dizi)","Tekiller Toplamı"], [[100,100,0],[200,200,""],[100,300,""],[300,"",""]]),
        objectives: [
          {
                    "id": "o1",
                    "title": "Yayılım Operatörü (#)",
                    "description": "=TOPLA(B2:B4) veya B2# ile taşan tüm diziyi toplama."
          }
],
        teachingSteps: [
          {
                    "id": "ts1",
                    "title": "# (Diyez) Sihri",
                    "explanation": "B2 hücresinde aşağıya taşan bir formül varsa, kaç satır uzadığını bilmenize gerek yoktur. =TOPLA(B2#) yazdığınızda Excel B2 den taşan tüm alanı otomatik olarak toplar!",
                    "speechText": "Dinamik dizilerin ürettiği tüm sonuçları tek hamlede yakalamak için hücre adresinin sonuna diyez yani kare işareti koyarız. Örneğin B2 kare, B2 den taşan tüm elemanları ifade eder."
          }
],
        tasks: [
          {
                    "id": "t13_4_1",
                    "stepNumber": 1,
                    "instruction": "C2 hücresine \"=TOPLA(B2:B4)\" formülünü yazarak tekil değerlerin toplamını alın.",
                    "targetCell": "C2",
                    "hints": [
                              "C2 hücresini seçin.",
                              "=TOPLA(B2:B4) yazın.",
                              "Sonuç 100 + 200 + 300 = 600 olmalıdır."
                    ],
                    "validation": {
                              "targetCell": "C2",
                              "expectedValue": 600,
                              "expectedFormulaKeywords": [
                                        "TOPLA",
                                        "SUM"
                              ],
                              "successMessage": "Mükemmel! Dinamik dizi sonuçlarını başarıyla konsolide ettiniz."
                    }
          }
],
        quiz: {
          "id": "q13_4",
          "title": "Taşma Başvurusu (#) Testi",
          "passingScore": 80,
          "questions": [
                    {
                              "id": "q13_4_1",
                              "question": "Hücre referansının sonuna eklenen # işareti (örn: E2#) neyi temsil eder?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "E2 hücresindeki sayısal değeri"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "E2 hücresinden başlayıp taşan tüm dinamik dizi aralığını"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "Hatalı formülü"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "Yalnızca E2 ve E3 hücrelerini"
                                        }
                              ],
                              "correctOptionId": "b",
                              "explanation": "E2# yazıldığında dizinin büyüklüğü 5 satır da olsa 5000 satır da olsa tüm yayılma aralığını kapsar.",
                              "measuredSkill": "Yayılım operatörü tanımı"
                    },
                    {
                              "id": "q13_4_2",
                              "question": "Veri tablosuna yeni bir satır eklendiğinde E2# referanslı formül ne yapar?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "Otomatik olarak genişler ve yeni satırı da hesaba katar"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "#BAŞV! hatası verir"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "Eski haliyle donar"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "Formülü siler"
                                        }
                              ],
                              "correctOptionId": "a",
                              "explanation": "Dinamik diziler veri büyüdükçe otomatik uzar ve # referansı tüm yeni satırları anında kapsar.",
                              "measuredSkill": "Dinamik dizi adaptasyonu"
                    }
          ]
}
      },
      {
        id: "sec13_l5",
        phaseId: 13,
        unitId: "u13_5",
        title: "Bölüm 13 Dinamik Diziler Kapsamlı Projesi ve Sınavı",
        shortDesc: "BENZERSİZ, SIRALA ve FİLTRE fonksiyonlarıyla canlı satış yönetim paneli oluşturma.",
        category: "Dinamik Diziler",
        groupTitle: "Kazanım Değerlendirme",
        primaryGoal: "Bölüm 13 teki tüm dinamik dizi yetkinliklerini ölçmek.",
        prerequisites: ["sec13_l1","sec13_l2","sec13_l3","sec13_l4"],
        commonMistakes: ["Dinamik dizi engellerini fark edememek"],
        successCriteria: "Sınavdan en az %80 alarak Excel Tabloları bölümüne geçmek.",
        level: "İleri",
        durationMinutes: 15,
        functionsUsed: ["BENZERSİZ","SIRALA","FİLTRE"],
        initialWorkbook: createTableSheet("s13_5", "Final13Proje", ["Bölüm","Temsilci","Satış (TL)","En Yüksek Satış"], [["Kurumsal","Ahmet Demir",120000,0],["Bireysel","Selin Ak",85000,""],["Kurumsal","Murat Kurt",165000,""]]),
        objectives: [
          {
                    "id": "o1",
                    "title": "Nihai Dinamik Dizi Becerisi",
                    "description": "Canlı tablo ve dizi entegrasyonu."
          }
],
        teachingSteps: [
          {
                    "id": "ts1",
                    "title": "Dinamik Dizi Uzmanlığı",
                    "explanation": "365 ve modern Excel in kalbi olan dinamik dizileri tamamladınız. D2 hücresine =MAK(C2:C4) formülü ile en yüksek satışı bulun ve final sınavını tamamlayın.",
                    "speechText": "Dinamik dizilerde tam bir uzmansınız. En yüksek satışı bulup bölüm değerlendirme sınavına geçelim."
          }
],
        tasks: [
          {
                    "id": "t13_5_1",
                    "stepNumber": 1,
                    "instruction": "D2 hücresine \"=MAK(C2:C4)\" formülünü yazarak en yüksek satış cirosunu bulun.",
                    "targetCell": "D2",
                    "hints": [
                              "D2 hücresini seçin.",
                              "=MAK(C2:C4) yazın.",
                              "165000 çıkmalıdır."
                    ],
                    "validation": {
                              "targetCell": "D2",
                              "expectedValue": 165000,
                              "expectedFormulaKeywords": [
                                        "MAK",
                                        "MAX"
                              ],
                              "successMessage": "Tebrikler! Bölüm 13 final projesini başarıyla tamamladınız."
                    }
          }
],
        quiz: {
          "id": "q13_5",
          "title": "Bölüm 13 Dinamik Diziler Final Sınavı",
          "passingScore": 80,
          "questions": [
                    {
                              "id": "q13_5_1",
                              "question": "Orijinal tablonuz A1:C50 aralığında iken, sadece \"Marmara\" bölgesine ait satışları büyükten küçüğe sıralayarak başka bir yere dökmek için hangi iki fonksiyon iç içe kullanılır?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "=SIRALA(FİLTRE(A1:C50; B1:B50=\"Marmara\"); 3; -1)"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "=DÜŞEYARA(EĞER())"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "=TOPLA(BENZERSİZ())"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "=ETOPLA(SIRALA())"
                                        }
                              ],
                              "correctOptionId": "a",
                              "explanation": "Önce FİLTRE ile Marmara verileri süzülür, çıkan dizi SIRALA fonksiyonuna beslenerek azalan sırada dizilir.",
                              "measuredSkill": "İleri dinamik dizi kombinasyonları"
                    },
                    {
                              "id": "q13_5_2",
                              "question": "Dinamik dizi formülleri kullanılan bir dosyayı Excel 2013 veya 2016 da açarsanız formülün başına hangi sembol eklenir?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "@ (Örtük kesişim operatörü)"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "$"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "#"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "?"
                                        }
                              ],
                              "correctOptionId": "a",
                              "explanation": "Dinamik dizi desteği olmayan eski Excel sürümleri formülün başına @ koyarak yalnızca tek bir hücre değerini alır.",
                              "measuredSkill": "Geriye dönük Excel sürüm uyumluluğu"
                    }
          ]
}
      }
    ]
  },
  {
    id: 14,
    category: "Tablolar & Yapılandırılmış Veri",
    title: "14. Excel Tabloları ve Yapılandırılmış Veriler",
    subtitle: "Standart aralığı tabloya (Ctrl+T) dönüştürme, yapılandırılmış başvurular ve dilimleyiciler",
    iconName: "Table",
    description: "Düz hücre aralıklarını profesyonel Excel Tablosuna (Ctrl+T) dönüştürme, [@Maaş] gibi yapılandırılmış başvuru formülleri, otomatik genişleme ve özet satırları.",
    lessons: [
      {
        id: "sec14_l1",
        phaseId: 14,
        unitId: "u14_1",
        title: "Standart Aralığı Excel Tablosuna (Ctrl+T) Dönüştürme",
        shortDesc: "Ctrl+T kısayolu ile otomatik şeritli satırlar, filtre butonları ve dinamik genişleme.",
        category: "Tablolar & Yapılandırılmış Veri",
        groupTitle: "Excel Tabloları",
        primaryGoal: "Düz verileri Ctrl+T ile resmi Excel Tablosu nesnesine dönüştürmek.",
        prerequisites: ["sec13_l5"],
        commonMistakes: ["Tablom üstbilgi satırı içeriyor kutusunu işaretlemeyip başlıkların veri satırı olarak kalması"],
        successCriteria: "Excel Tablosu yapısını kavramak ve hedef hücrede işlem yapmak.",
        level: "Başlangıç",
        durationMinutes: 12,
        functionsUsed: [],
        initialWorkbook: createTableSheet("s14_1", "TabloDönüşüm", ["Personel","Bölüm","Maaş (TL)","Prim Oranı"], [["Ahmet Yılmaz","Finans",45000,0.1],["Mehmet Kaya","Satış",38000,0.15],["Ayşe Demir","İK",42000,0.08]]),
        objectives: [
          {
                    "id": "o1",
                    "title": "Ctrl+T Üstünlükleri",
                    "description": "Otomatik formül yayılımı ve dinamik aralık büyümesi."
          }
],
        teachingSteps: [
          {
                    "id": "ts1",
                    "title": "Ctrl + T: Profesyonellerin Tercihi",
                    "explanation": "Düz hücre aralığında yeni satır eklendiğinde formüller güncellenmez. Ancak Ctrl+T ile Excel Tablosu yaparsanız yeni satır eklediğiniz an tüm formüller otomatik olarak o satıra da uygulanır.",
                    "speechText": "Excel de düz tablolar yerine Ctrl+T ile resmi Tablo nesnesi kullanırız. Yeni veri eklediğinizde grafikleriniz, formülleriniz ve özetleriniz kendiliğinden büyür."
          }
],
        tasks: [
          {
                    "id": "t14_1_1",
                    "stepNumber": 1,
                    "instruction": "C2 hücresini seçip maaşı inceleyin.",
                    "targetCell": "C2",
                    "hints": [
                              "C2 hücresini seçin.",
                              "45000 değerini doğrulayın."
                    ],
                    "validation": {
                              "targetCell": "C2",
                              "expectedValue": 45000,
                              "successMessage": "Harika! Tablo hücresini seçtiniz."
                    }
          }
],
        quiz: {
          "id": "q14_1",
          "title": "Excel Tabloları Testi",
          "passingScore": 80,
          "questions": [
                    {
                              "id": "q14_1_1",
                              "question": "Düz bir hücre aralığını resmi Excel Tablosuna dönüştüren evrensel klavye kısayolu nedir?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "Ctrl + T (veya Ctrl + L)"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "Ctrl + P"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "Ctrl + B"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "Alt + F4"
                                        }
                              ],
                              "correctOptionId": "a",
                              "explanation": "Ctrl + T (Table) ve Ctrl + L (List) aralığı tablo nesnesine çevirir.",
                              "measuredSkill": "Tablo kısayolu"
                    },
                    {
                              "id": "q14_1_2",
                              "question": "Bir Excel tablosunun en altındaki satıra yeni bir kayıt yazıldığında tablo ne yapar?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "Otomatik olarak genişler, biçimlendirmeyi ve hesaplanmış sütun formüllerini devralır"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "Hata verir"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "Tablo bozulur"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "Eski satırları siler"
                                        }
                              ],
                              "correctOptionId": "a",
                              "explanation": "Excel Tablolarının en büyük gücü veriler girdikçe otomatik genişlemesidir.",
                              "measuredSkill": "Dinamik tablo büyüme mekanizması"
                    }
          ]
}
      },
      {
        id: "sec14_l2",
        phaseId: 14,
        unitId: "u14_2",
        title: "Yapılandırılmış Başvuru ([@Maaş]*[@Prim]) ile Formül Yazma",
        shortDesc: "A2*B2 yerine [@Maaş]*[@Prim] yazarak okunabilir ve otomatik yayılan formüller kurma.",
        category: "Tablolar & Yapılandırılmış Veri",
        groupTitle: "Yapılandırılmış Başvurular",
        primaryGoal: "Tablo sütun başlıklarını formüllerde kullanarak sütun genelinde hesaplama yapmak.",
        prerequisites: ["sec14_l1"],
        commonMistakes: ["@ işaretinin o satırdaki değeri ifade ettiğini unutmak"],
        successCriteria: "Yapılandırılmış başvuru ile prim tutarını hesaplamak.",
        level: "Orta",
        durationMinutes: 14,
        functionsUsed: [],
        initialWorkbook: createTableSheet("s14_2", "Yapılandırılmış", ["Personel","Maaş","Prim","Prim Tutarı"], [["Ahmet Yılmaz",40000,0.15,0],["Mehmet Kaya",35000,0.1,0],["Ayşe Demir",48000,0.2,0]]),
        objectives: [
          {
                    "id": "o1",
                    "title": "Hesaplanmış Sütun Mantığı",
                    "description": "Tek hücreye yazılan formülün tüm sütuna kendiliğinden yayılması."
          }
],
        teachingSteps: [
          {
                    "id": "ts1",
                    "title": "Okunabilir Formüller",
                    "explanation": "Tablolarda =B2*C2 yazmak yerine =[@Maaş]*[@Prim] yazarız. Formülü aşağıya sürüklemenize bile gerek kalmaz; Excel Tablosu tek tıklamayla tüm satırları anında doldurur.",
                    "speechText": "Yapılandırılmış başvurular formüllerin anlaşılmasını çok kolaylaştırır. Maaş çarpı Prim yazdığınızda hem formül ne yaptığını açıklar hem de tüm tabloya anında yayılır."
          }
],
        tasks: [
          {
                    "id": "t14_2_1",
                    "stepNumber": 1,
                    "instruction": "D2 hücresine \"=[@Maaş]*[@Prim]\" formülünü yazarak ilk personelin primini hesaplayın.",
                    "targetCell": "D2",
                    "hints": [
                              "D2 hücresini seçin.",
                              "=[@Maaş]*[@Prim] veya =B2*C2 yazın.",
                              "40000 * 0.15 = 6000 sonucunu verecektir."
                    ],
                    "validation": {
                              "targetCell": "D2",
                              "expectedValue": 6000,
                              "successMessage": "Tebrikler! Yapılandırılmış başvuru ile prim tutarını başarıyla hesapladınız."
                    }
          }
],
        quiz: {
          "id": "q14_2",
          "title": "Yapılandırılmış Başvuru Testi",
          "passingScore": 80,
          "questions": [
                    {
                              "id": "q14_2_1",
                              "question": "Bir Excel tablosunda \"=[@Maaş]*[@Prim]\" yazıldığında \"[@Maaş]\" ifadesi ne anlama gelir?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "Tüm tablonun maaş toplamı"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "Formülün yazıldığı aktif satırdaki Maaş sütununun değeri"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "En yüksek maaş"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "Sayfa adı"
                                        }
                              ],
                              "correctOptionId": "b",
                              "explanation": "@ işareti yapılandırılmış başvurularda \"bu satırdaki değer\" anlamına gelir.",
                              "measuredSkill": "Yapılandırılmış başvuru @ işareti anlamı"
                    },
                    {
                              "id": "q14_2_2",
                              "question": "Tablo dışındaki bir hücreden Tablo1 in Ciro sütunundaki tüm değerleri toplamak için formül nasıl yazılır?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "=TOPLA(Tablo1[Ciro])"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "=TOPLA(Tablo1[@Ciro])"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "=CİRO_TOPLA()"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "=A1:A1000"
                                        }
                              ],
                              "correctOptionId": "a",
                              "explanation": "Tablo1[Ciro] ifadesi o tablonun Ciro sütunundaki tüm veri satırlarını dinamik olarak kapsar.",
                              "measuredSkill": "Dış hücreden tablo sütununa başvuru"
                    }
          ]
}
      },
      {
        id: "sec14_l3",
        phaseId: 14,
        unitId: "u14_3",
        title: "Tablo Toplam Satırı (Total Row) ve Otomatik Özetleme",
        shortDesc: "Tek tıkla tablonun altına özet satırı ekleme ve ALTTOPLAM fonksiyonu ile dinamik özet.",
        category: "Tablolar & Yapılandırılmış Veri",
        groupTitle: "Toplam Satırı",
        primaryGoal: "Tablo Tasarımı menüsünden Toplam Satırını etkinleştirip ALTTOPLAM ile filtrelenebilir özet almak.",
        prerequisites: ["sec14_l2"],
        commonMistakes: ["TOPLA yerine ALTTOPLAM kullanıldığında filtrelenen satırların gizlendiğinde toplama dahil edilmediğini bilmemek"],
        successCriteria: "Toplam satırında genel satış tutarını hesaplamak.",
        level: "Orta",
        durationMinutes: 12,
        functionsUsed: ["TOPLA"],
        initialWorkbook: createTableSheet("s14_3", "ToplamSatırı", ["Ürün","Adet","Birim Fiyat","Tutar"], [["Laptop",5,25000,125000],["Monitör",10,6000,60000],["Klavye",20,1500,30000],["Genel Toplam","","",0]]),
        objectives: [
          {
                    "id": "o1",
                    "title": "Toplam Satırı Mimarisi",
                    "description": "Tablo Tasarımı > Toplam Satırı kutusu ve ALTTOPLAM."
          }
],
        teachingSteps: [
          {
                    "id": "ts1",
                    "title": "Sihirli Toplam Satırı",
                    "explanation": "Tablo Tasarımı sekmesindeki \"Toplam Satırı\" onay kutusuna tıkladığınızda tablonun altına otomatik olarak özet satırı gelir. Açılır menüden Toplam, Ortalama, Sayım seçebilirsiniz.",
                    "speechText": "Excel Tablolarının en pratik özelliklerinden biri Toplam Satırıdır. Tabloyu filtrelediğinizde bile sadece ekranda görünen satırları dinamik olarak toplar."
          }
],
        tasks: [
          {
                    "id": "t14_3_1",
                    "stepNumber": 1,
                    "instruction": "D5 hücresine \"=TOPLA(D2:D4)\" formülünü yazarak genel tutarı hesaplayın.",
                    "targetCell": "D5",
                    "hints": [
                              "D5 hücresini seçin.",
                              "=TOPLA(D2:D4) yazın.",
                              "125000 + 60000 + 30000 = 215000 çıkmalıdır."
                    ],
                    "validation": {
                              "targetCell": "D5",
                              "expectedValue": 215000,
                              "expectedFormulaKeywords": [
                                        "TOPLA",
                                        "SUM",
                                        "ALTTOPLAM",
                                        "SUBTOTAL"
                              ],
                              "successMessage": "Tebrikler! Toplam satırını başarıyla hesapladınız."
                    }
          }
],
        quiz: {
          "id": "q14_3",
          "title": "Tablo Toplam Satırı Testi",
          "passingScore": 80,
          "questions": [
                    {
                              "id": "q14_3_1",
                              "question": "Excel Tablosunun Toplam Satırında varsayılan olarak hangi fonksiyon kullanılır ve neden?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "ALTTOPLAM (SUBTOTAL); çünkü tablo filtrelendiğinde gizlenen satırları hesaba katmaz"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "TOPLA; her zaman tüm hücreleri toplar"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "ÇARPIM; sayıları çarpar"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "YUVARLA; sayıları küçültür"
                                        }
                              ],
                              "correctOptionId": "a",
                              "explanation": "ALTTOPLAM fonksiyonu yalnızca filtrelenip ekranda kalan satırları topladığı için yönetim özetlerinde hata payını sıfırlar.",
                              "measuredSkill": "ALTTOPLAM fonksiyonu filtre duyarlılığı"
                    },
                    {
                              "id": "q14_3_2",
                              "question": "Toplam satırındaki bir hücreye tıklandığında ne görünür?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "Toplam, Ortalama, En Büyük, Sayım gibi seçenekler sunan bir açılır liste oku"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "Hiçbir şey görünmez"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "Tablo silinir"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "Grafik açılır"
                                        }
                              ],
                              "correctOptionId": "a",
                              "explanation": "Toplam satırı hücreleri sağ altındaki ok ile tek tıkla ortalama, sayım veya toplama dönüştürülebilir.",
                              "measuredSkill": "Toplam satırı arayüz kontrolleri"
                    }
          ]
}
      },
      {
        id: "sec14_l4",
        phaseId: 14,
        unitId: "u14_4",
        title: "Bölüm 14 Excel Tabloları Kapsamlı Projesi ve Sınavı",
        shortDesc: "Yapılandırılmış tablo mimarisi, dilimleyici bağlama ve veri modeli entegrasyonu projesi.",
        category: "Tablolar & Yapılandırılmış Veri",
        groupTitle: "Kazanım Değerlendirme",
        primaryGoal: "Bölüm 14 teki kurumsal tablo kazanımlarını ölçmek.",
        prerequisites: ["sec14_l1","sec14_l2","sec14_l3"],
        commonMistakes: ["Tablo adlarını anlamlı vermemek (Tablo1 yerine Satislar demek gerekir)"],
        successCriteria: "Sınavdan en az %80 alarak Sıralama ve Filtreleme bölümüne geçmek.",
        level: "Orta",
        durationMinutes: 15,
        functionsUsed: ["TOPLA"],
        initialWorkbook: createTableSheet("s14_4", "Final14Proje", ["Sipariş No","Müşteri","Adet","Birim Fiyat","Ciro (TL)"], [["SP-101","Anadolu A.Ş.",12,5000,0],["SP-102","Ege Ltd",8,7500,60000],["SP-103","Marmara Dağıtım",20,4000,80000],["Toplam Ciro","","","",0]]),
        objectives: [
          {
                    "id": "o1",
                    "title": "Kurumsal Tablo Modeli",
                    "description": "Ciro sütununu hesaplayıp genel toplamı alma."
          }
],
        teachingSteps: [
          {
                    "id": "ts1",
                    "title": "Bölüm 14 Final Projesi",
                    "explanation": "Kurumsal Excel in omurgası Tablo nesneleridir. E2 hücresine =C2*D2 formülünü yazarak ciroyu bulun, ardından E5 hücresine genel toplamı yazıp sınavınızı tamamlayın.",
                    "speechText": "Excel Tabloları bölümünü tamamladınız. Formülünüzü yazıp bölüm bitirme sınavını başarıyla geçelim."
          }
],
        tasks: [
          {
                    "id": "t14_4_1",
                    "stepNumber": 1,
                    "instruction": "E2 hücresine \"=C2*D2\" formülünü yazarak ilk siparişin cirosunu hesaplayın.",
                    "targetCell": "E2",
                    "hints": [
                              "E2 hücresini seçin.",
                              "=C2*D2 yazın.",
                              "12 * 5000 = 60000 olmalıdır."
                    ],
                    "validation": {
                              "targetCell": "E2",
                              "expectedValue": 60000,
                              "successMessage": "Tebrikler! İlk sipariş cirosunu başarıyla hesapladınız."
                    }
          },
          {
                    "id": "t14_4_2",
                    "stepNumber": 2,
                    "instruction": "E5 hücresine \"=TOPLA(E2:E4)\" formülünü yazarak toplam şirket cirosunu hesaplayın.",
                    "targetCell": "E5",
                    "hints": [
                              "E5 hücresini seçin.",
                              "=TOPLA(E2:E4) yazın.",
                              "60000 + 60000 + 80000 = 200000 çıkmalıdır."
                    ],
                    "validation": {
                              "targetCell": "E5",
                              "expectedValue": 200000,
                              "expectedFormulaKeywords": [
                                        "TOPLA",
                                        "SUM"
                              ],
                              "successMessage": "Harika! Toplam şirket cirosunu başarıyla konsolide ettiniz."
                    }
          }
],
        quiz: {
          "id": "q14_4",
          "title": "Bölüm 14 Kapsamlı Tablolar Sınavı",
          "passingScore": 80,
          "questions": [
                    {
                              "id": "q14_4_1",
                              "question": "Excel Tablolarını Dilimleyici (Slicer) ile filtrelemek standart filtre oklarına göre neden daha avantajlıdır?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "Görsel butonlar sunar, hangi filtrenin aktif olduğunu açıkça gösterir ve dokunmatik ekranlarda çok hızlıdır"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "Yalnızca yazıcıdan çıktı almak için kullanılır"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "Formülleri siler"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "Daha yavaştır"
                                        }
                              ],
                              "correctOptionId": "a",
                              "explanation": "Dilimleyiciler görsel butonlar oluşturarak dashboard ve rapor filtrelemesini son derece pratik ve profesyonel kılar.",
                              "measuredSkill": "Dilimleyici (Slicer) avantajları"
                    },
                    {
                              "id": "q14_4_2",
                              "question": "Bir Excel Tablosunu yeniden standart bir hücre aralığına çevirmek için Tablo Tasarımı menüsünden hangi komut kullanılır?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "Aralığa Dönüştür (Convert to Range)"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "Tabloyu Sil"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "Geri Al"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "Yeniden Adlandır"
                                        }
                              ],
                              "correctOptionId": "a",
                              "explanation": "Aralığa Dönüştür komutu verileri ve biçimleri koruyarak tablo nesnesini normal hücrelere çevirir.",
                              "measuredSkill": "Tablo nesnesini çözme komutu"
                    }
          ]
}
      }
    ]
  },
  {
    id: 15,
    category: "Veri Yönetimi",
    title: "15. Sıralama, Filtreleme ve Veri Yönetimi",
    subtitle: "Çok düzeyli özel sıralama, metin/sayı filtreleri, gelişmiş filtre ve dinamik süzgeçler",
    iconName: "ArrowDownUp",
    description: "Büyük veri listelerini mantıksal düzene sokma, çok kriterli sıralama, gelişmiş filtreleme kuralları, mükerrer kayıtları ayıklama ve metinleri sütunlara ayırma.",
    lessons: [
      {
        id: "sec15_l1",
        phaseId: 15,
        unitId: "u15_1",
        title: "Çok Düzeyli Özel Sıralama (Önce Bölge, Sonra Satış)",
        shortDesc: "Aynı anda birden fazla sütuna göre sıralama (Örn: Bölgeler A-Z, aynı bölgedekiler ciroya göre Z-A).",
        category: "Veri Yönetimi",
        groupTitle: "Sıralama",
        primaryGoal: "Özel Sıralama menüsü ile hiyerarşik çok düzeyli sıralama kuralı oluşturmak.",
        prerequisites: ["sec14_l4"],
        commonMistakes: ["Tablonun sadece bir sütununu seçip sıralayarak satırların birbiriyle olan bağını koparmak!"],
        successCriteria: "Çok düzeyli sıralama mantığını kavramak.",
        level: "Başlangıç",
        durationMinutes: 10,
        functionsUsed: [],
        initialWorkbook: createTableSheet("s15_1", "ÖzelSıralama", ["Bölge","Temsilci","Ciro (TL)"], [["Marmara","Ahmet Yılmaz",95000],["Ege","Mehmet Kaya",120000],["Marmara","Canan Öztürk",140000],["Ege","Burak Demir",85000]]),
        objectives: [
          {
                    "id": "o1",
                    "title": "Çok Düzeyli Sıralama",
                    "description": "Veri > Sırala menüsü ile Düzey Ekle kuralı."
          }
],
        teachingSteps: [
          {
                    "id": "ts1",
                    "title": "Hiyerarşik Sıralama",
                    "explanation": "Tek bir sütuna basıp A-Z yapmak yetersiz kalabilir. Veri sekmesindeki Sırala butonuna basıp \"Önce Bölgeye göre A-Z, ardından Düzey Ekle diyerek Ciroya göre Büyükten Küçüğe\" kuralı koyarız.",
                    "speechText": "Raporlarda verileri hem bölgeye hem de ciroya göre sıralamak için Çok Düzeyli Sıralama kullanırız. Asla tek bir sütunu seçip sıralamayın, tablonun bütünlüğü bozulabilir."
          }
],
        tasks: [
          {
                    "id": "t15_1_1",
                    "stepNumber": 1,
                    "instruction": "D2 hücresine \"Sıralandı\" yazın.",
                    "targetCell": "D2",
                    "hints": [
                              "D2 hücresini seçin.",
                              "Sıralandı yazın.",
                              "Enter a basın."
                    ],
                    "validation": {
                              "targetCell": "D2",
                              "expectedValue": "Sıralandı",
                              "successMessage": "Harika! Çok düzeyli sıralama adımı tamamlandı."
                    }
          }
],
        quiz: {
          "id": "q15_1",
          "title": "Sıralama Testi",
          "passingScore": 80,
          "questions": [
                    {
                              "id": "q15_1_1",
                              "question": "Excel de sıralama yaparken tablonun tamamı yerine yalnızca bir sütunu seçip A-Z ye basılırsa ne tehlikesi oluşur?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "Hiçbir şey olmaz"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "Seçili sütun sıralanır ancak diğer sütunlar yerinde kalır ve isimler ile maaşlar birbirine karışır"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "Excel çöker"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "Tüm sayılar silinir"
                                        }
                              ],
                              "correctOptionId": "b",
                              "explanation": "Yalnızca tek sütun seçildiğinde satır bütünlüğü bozulur ve veriler birbirine karışır.",
                              "measuredSkill": "Sıralama güvenlik uyarısı"
                    },
                    {
                              "id": "q15_1_2",
                              "question": "Özel bir listeye göre sıralama yapmak (Örn: Ocak, Şubat, Mart veya Küçük, Orta, Büyük) için nereden liste seçilir?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "Sırala menüsündeki \"Düzen\" kısmından \"Özel Liste...\" seçeneği"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "Görünüm sekmesinden"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "Baskı önizlemeden"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "Yazı tipi boyutundan"
                                        }
                              ],
                              "correctOptionId": "a",
                              "explanation": "Excel in Özel Liste (Custom List) ayarı ile aylar, unvanlar veya bedenler özel mantıkla dizilebilir.",
                              "measuredSkill": "Özel liste ile sıralama"
                    }
          ]
}
      },
      {
        id: "sec15_l2",
        phaseId: 15,
        unitId: "u15_2",
        title: "Sayı ve Metin Filtreleri (İçerir, İlk 10, Ortalamanın Üstü)",
        shortDesc: "Standart onay kutularının ötesine geçerek sayı ve metin koşullarıyla filtreleme.",
        category: "Veri Yönetimi",
        groupTitle: "Gelişmiş Filtreleme",
        primaryGoal: "Sayı Filtreleri menüsünden \"Ortalamanın Üstü\" ve \"İlk 10\" kriterlerini çalıştırmak.",
        prerequisites: ["sec15_l1"],
        commonMistakes: ["Tüm onay kutularını tek tek elle temizlemeye çalışıp vakit kaybetmek"],
        successCriteria: "Filtreleme kriterlerini ve formül özetini oluşturmak.",
        level: "Orta",
        durationMinutes: 12,
        functionsUsed: ["ORTALAMA"],
        initialWorkbook: createTableSheet("s15_2", "SayıFiltreleri", ["Ürün Kodu","Ürün Adı","Stok","Fiyat (TL)","Ortalama Fiyat"], [["PRD-01","Ofis Koltuğu",25,4500,0],["PRD-02","Çalışma Masası",10,8500,""],["PRD-03","Kitaplık",15,6000,""],["PRD-04","Lamba",40,1200,""]]),
        objectives: [
          {
                    "id": "o1",
                    "title": "Sayı Filtresi Kuralları",
                    "description": "Ortalamanın Üstü ve Büyüktür kuralları."
          }
],
        teachingSteps: [
          {
                    "id": "ts1",
                    "title": "Akıllı Filtreler",
                    "explanation": "Filtre okuna bastığınızda \"Sayı Filtreleri\" seçeneğini görürsünüz. Burada \"Ortalamanın Üstünde\" ye bastığınızda Excel tablonun ortalamasını otomatik hesaplar ve sadece ortalamanın üzerindeki ürünleri ekranda bırakır.",
                    "speechText": "Akıllı sayı ve metin filtreleri binlerce satırlık listelerde en iyi satışları, kritik stokları ve belirli kelimeleri içeren ürünleri saniyeler içinde ayıklar."
          }
],
        tasks: [
          {
                    "id": "t15_2_1",
                    "stepNumber": 1,
                    "instruction": "E2 hücresine \"=ORTALAMA(D2:D5)\" formülünü yazarak ürünlerin ortalama fiyatını bulun.",
                    "targetCell": "E2",
                    "hints": [
                              "E2 hücresini seçin.",
                              "=ORTALAMA(D2:D5) yazın.",
                              "(4500 + 8500 + 6000 + 1200) / 4 = 5050 olmalıdır."
                    ],
                    "validation": {
                              "targetCell": "E2",
                              "expectedValue": 5050,
                              "expectedFormulaKeywords": [
                                        "ORTALAMA",
                                        "AVERAGE"
                              ],
                              "successMessage": "Tebrikler! Ortalama fiyatı başarıyla hesapladınız."
                    }
          }
],
        quiz: {
          "id": "q15_2",
          "title": "Akıllı Filtreler Testi",
          "passingScore": 80,
          "questions": [
                    {
                              "id": "q15_2_1",
                              "question": "İçinde yüzlerce farklı şehir olan bir tabloda adı \"İz\" ile başlayan tüm şehirleri süzmek için hangi filtre kuralı kullanılır?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "Metin Filtreleri > Şununla Başlar: \"İz\""
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "Sayı Filtreleri"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "Yazı tipi rengi"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "A-Z ye sırala"
                                        }
                              ],
                              "correctOptionId": "a",
                              "explanation": "Metin Filtreleri menüsünde \"Şununla Başlar\", \"Şununla Biter\", \"İçerir\" gibi güçlü kurallar bulunur.",
                              "measuredSkill": "Metin filtreleme kuralları"
                    },
                    {
                              "id": "q15_2_2",
                              "question": "Tablodaki tüm filtreleri tek hamlede kaldırmak için hangi kısayol kullanılır?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "Ctrl + Shift + L"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "Ctrl + S"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "Ctrl + P"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "Alt + F4"
                                        }
                              ],
                              "correctOptionId": "a",
                              "explanation": "Ctrl + Shift + L filtre oklarını açıp kapatan evrensel kısayoldur.",
                              "measuredSkill": "Filtre kısayolu"
                    }
          ]
}
      },
      {
        id: "sec15_l3",
        phaseId: 15,
        unitId: "u15_3",
        title: "Gelişmiş Filtre (Advanced Filter) ve Ölçüt Aralığı",
        shortDesc: "Karmaşık VE/YADA mantıklarını ölçüt aralığı tablosu kurarak başka bir sayfaya aktarma.",
        category: "Veri Yönetimi",
        groupTitle: "Gelişmiş Filtre",
        primaryGoal: "Veri > Gelişmiş menüsü ile ölçüt aralığı tanımlayıp kayıtları başka konuma kopyalamak.",
        prerequisites: ["sec15_l2"],
        commonMistakes: ["Ölçüt aralığındaki başlıkların ana tablodaki başlıklarla birebir aynı harf harfine uyuşmaması"],
        successCriteria: "Ölçüt tablosundaki harcama toplamını hesaplayabilmek.",
        level: "İleri",
        durationMinutes: 14,
        functionsUsed: ["TOPLA"],
        initialWorkbook: createTableSheet("s15_3", "GelişmişFiltre", ["Şube","Departman","Harcama (TL)","Kriter Toplam"], [["Ankara","Satış",45000,0],["İstanbul","Pazarlama",90000,""],["Ankara","Pazarlama",65000,""],["İzmir","Satış",38000,""]]),
        objectives: [
          {
                    "id": "o1",
                    "title": "Gelişmiş Filtre Mimarisi",
                    "description": "Liste aralığı, Ölçüt aralığı ve Başka yere kopyala prensibi."
          }
],
        teachingSteps: [
          {
                    "id": "ts1",
                    "title": "Standart Filtrenin Yetmediği Anlar",
                    "explanation": "Karmaşık şartlarda (örneğin Ankara daki Satış VE İstanbul daki Pazarlama) standart filtre kilitlenir. Gelişmiş Filtre (Advanced Filter) ile ayrı bir ölçüt tablosu kurar ve sonuçları temiz bir sayfaya tek tıkla kopyalarız.",
                    "speechText": "Gelişmiş Filtre kurumsal raporlamanın gizli silahıdır. Birden fazla farklı koşulu aynı anda sınayıp sonuçları bağımsız bir alana filtreleyebilirsiniz."
          }
],
        tasks: [
          {
                    "id": "t15_3_1",
                    "stepNumber": 1,
                    "instruction": "D2 hücresine \"=TOPLA(C2:C5)\" formülünü yazarak tüm şubelerin harcama toplamını bulun.",
                    "targetCell": "D2",
                    "hints": [
                              "D2 hücresini seçin.",
                              "=TOPLA(C2:C5) yazın.",
                              "45000 + 90000 + 65000 + 38000 = 238000 olmalıdır."
                    ],
                    "validation": {
                              "targetCell": "D2",
                              "expectedValue": 238000,
                              "expectedFormulaKeywords": [
                                        "TOPLA",
                                        "SUM"
                              ],
                              "successMessage": "Tebrikler! Toplam harcamayı başarıyla hesapladınız."
                    }
          }
],
        quiz: {
          "id": "q15_3",
          "title": "Gelişmiş Filtre Testi",
          "passingScore": 80,
          "questions": [
                    {
                              "id": "q15_3_1",
                              "question": "Gelişmiş Filtre ölçüt aralığında iki kriter AYNI SATIRA yazılırsa Excel hangi mantığı uygular?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "VE (AND) mantığı (Her iki koşul da aynı anda sağlanmalı)"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "YADA (OR) mantığı"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "İkisi de uygulanmaz"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "Hata verir"
                                        }
                              ],
                              "correctOptionId": "a",
                              "explanation": "Ölçüt aralığında aynı satırda olan kriterler VE, alt alta farklı satırlarda olan kriterler YADA mantığıyla çalışır.",
                              "measuredSkill": "Gelişmiş filtre Boole kuralı"
                    },
                    {
                              "id": "q15_3_2",
                              "question": "Gelişmiş Filtre penceresinde sonuçların orijinal tabloyu gizlemek yerine başka bir boş alana aktarılması için hangi seçenek işaretlenir?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "Başka bir yere kopyala (Copy to another location)"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "Listeyi olduğu yerde filtrele"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "Yalnızca benzersiz kayıtlar"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "Sil"
                                        }
                              ],
                              "correctOptionId": "a",
                              "explanation": "Bu seçenek orijinal tabloya hiç dokunmadan filtrelenmiş temiz bir rapor alanı oluşturur.",
                              "measuredSkill": "Gelişmiş filtre kopyalama modu"
                    }
          ]
}
      },
      {
        id: "sec15_l4",
        phaseId: 15,
        unitId: "u15_4",
        title: "Bölüm 15 Veri Yönetimi Final Projesi ve Sınavı",
        shortDesc: "Sıralama, otomatik filtreleme, gelişmiş süzgeç ve veri analizi final değerlendirmesi.",
        category: "Veri Yönetimi",
        groupTitle: "Kazanım Değerlendirme",
        primaryGoal: "Bölüm 15 teki tüm veri yönetimi ve analizi yetkinliklerini ölçmek.",
        prerequisites: ["sec15_l1","sec15_l2","sec15_l3"],
        commonMistakes: ["Filtreleme kriterlerini kontrol etmemek"],
        successCriteria: "Sınavdan en az %80 alarak Hızlı Doldurma bölümüne geçmek.",
        level: "Orta",
        durationMinutes: 15,
        functionsUsed: ["MAK","MİN"],
        initialWorkbook: createTableSheet("s15_4", "Final15Proje", ["Kod","Kategori","Bölge","Satış (TL)","En Yüksek Satış"], [["K-01","Elektronik","Marmara",125000,0],["K-02","Gıda","Ege",82000,""],["K-03","Elektronik","İç Anadolu",94000,""],["K-04","Kozmetik","Marmara",67000,""]]),
        objectives: [
          {
                    "id": "o1",
                    "title": "Veri Yönetimi Ustalığı",
                    "description": "Tabloları süzme, sıralama ve en yüksek satış değerini tespit etme."
          }
],
        teachingSteps: [
          {
                    "id": "ts1",
                    "title": "Veri Yönetimi Finali",
                    "explanation": "Büyük veri tablolarını yönetmek bir Excel uzmanının en sık yaptığı iştir. E2 hücresine =MAK(D2:D5) yazarak en yüksek satış değerini tespit edin ve final sınavınızı yanıtlayın.",
                    "speechText": "Veri yönetimi bölümünü harika tamamladınız! Şimdi en yüksek satışı bulup değerlendirme sınavına geçelim."
          }
],
        tasks: [
          {
                    "id": "t15_4_1",
                    "stepNumber": 1,
                    "instruction": "E2 hücresine \"=MAK(D2:D5)\" formülünü yazarak en yüksek satış tutarını bulun.",
                    "targetCell": "E2",
                    "hints": [
                              "E2 hücresini seçin.",
                              "=MAK(D2:D5) yazın.",
                              "125000 çıkmalıdır."
                    ],
                    "validation": {
                              "targetCell": "E2",
                              "expectedValue": 125000,
                              "expectedFormulaKeywords": [
                                        "MAK",
                                        "MAX"
                              ],
                              "successMessage": "Tebrikler! En yüksek satışı başarıyla tespit ettiniz."
                    }
          }
],
        quiz: {
          "id": "q15_4",
          "title": "Bölüm 15 Kapsamlı Veri Yönetimi Sınavı",
          "passingScore": 80,
          "questions": [
                    {
                              "id": "q15_4_1",
                              "question": "Virgülle ayrılmış \"Ad,Soyad,Şehir\" şeklindeki metinleri ayrı ayrı sütunlara bölmek için Veri sekmesindeki hangi araç kullanılır?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "Yinelenenleri Kaldır"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "Metni Sütunlara Dönüştür (Text to Columns)"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "Birleştir"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "Veri Doğrulama"
                                        }
                              ],
                              "correctOptionId": "b",
                              "explanation": "Metni Sütunlara Dönüştür aracı belirli bir karaktere (virgül, noktalı virgül, boşluk) göre metinleri sütunlara dağıtır.",
                              "measuredSkill": "Metni Sütunlara Dönüştür aracı"
                    },
                    {
                              "id": "q15_4_2",
                              "question": "Tabloda yinelenen (mükerrer) kayıtları ayıklayıp tekilleştirmek için Veri sekmesinde hangi araç kullanılır?",
                              "options": [
                                        {
                                                  "id": "a",
                                                  "text": "Yinelenenleri Kaldır (Remove Duplicates)"
                                        },
                                        {
                                                  "id": "b",
                                                  "text": "Filtre"
                                        },
                                        {
                                                  "id": "c",
                                                  "text": "Metin Kaydır"
                                        },
                                        {
                                                  "id": "d",
                                                  "text": "Koşullu Biçimlendirme"
                                        }
                              ],
                              "correctOptionId": "a",
                              "explanation": "Yinelenenleri Kaldır aracı seçilen sütunlardaki mükerrer satırları saniyeler içinde temizler.",
                              "measuredSkill": "Yinelenenleri Kaldır aracı"
                    }
          ]
}
      }
    ]
  }
];
