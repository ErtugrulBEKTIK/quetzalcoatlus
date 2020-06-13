import React, { Component } from 'react';
import { TouchableOpacity, Modal, ScrollView, View } from 'react-native';
import {Text, Body} from "native-base";
import {res} from '~/helpers';
import {StyleSheet} from "react-native";

export default class SignUpForm extends Component {

  state = {
    termsModal: false
  }

  render() {

    return (
      <>
        <Body>
          <TouchableOpacity onPress={() => {this.setState({termsModal: true}) }}>
            <Text style={s.termsText}>Koşulları ve Veri İlkelerini kabul ediyorum.</Text>
          </TouchableOpacity>
        </Body>
        <Modal visible={this.state.termsModal} transparent={true}>
          <View style={s.modalContainer}>
            <View style={s.scrollView}>
              <TouchableOpacity onPress={() => {this.setState({termsModal: false}) }} style={s.closeButton}>
                <Text>X</Text>
              </TouchableOpacity>
              <ScrollView>
                <Text style={s.title}>KVKK AYDINLATMA METNİ</Text>
                <Text style={s.paragraph}>6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, Şirketimiz tarafından, Veri Sorumlusu sıfatıyla, kişisel verileriniz, iş amaçlarıyla bağlı olarak, aşağıda açıklandığı çerçevede kullanılmak, kaydedilmek, saklanmak, güncellenmek, aktarılmak ve/veya sınıflandırılmak suretiyle işlenecektir.  Bu kapsamda Şirketimiz tarafından başta özel hayatın gizliliği olmak üzere, kişilerin temel hak ve özgürlüklerini korumak ve kişisel verilerin korunması amacıyla düzenlenen Kanun ve Yönetmelikler gereğince Şirketimiz, kişisel verilerinizin hukuka aykırı olarak işlenmesini önleme, hukuka aykırı olarak erişilmesini önleme ve muhafazasını sağlama amacıyla, uygun güvenlik düzeyini temin etmeye yönelik tüm teknik ve idari tedbirleri almaktadır.</Text>
                <Text style={s.paragraph}>Bu metnin hedef kitlesi, Şirketimiz çalışanları veya Şirketimize iş başvurusu yapmış olan çalışan adayları dışındaki, Şirketimiz tarafından kişisel verileri işlenen tüm gerçek kişilerdir.</Text>
                <Text style={s.paragraph}>Veri sorumlusu sıfatıyla işlenen kişisel verilere, burada belirtilenlerle sınırlı sayıda olmamak üzere aşağıda yer verilmektedir;</Text>
                <Text style={s.paragraph}>İsim, soy isim, T.C. kimlik numarası, adres, telefon numarası, e-posta adresi, imza, fiziksel mekan/güvenlik görüntü kaydı, çağrı merkezi/hizmet kalitesi ses kaydı, banka hesap numarası, cookie kayıtları</Text>
                <Text style={s.subtitle}>Kişisel verilerin işlenme amaçları ve hukuki sebepleri;</Text>
                <Text style={s.paragraph}>Tarafınızca paylaşılan kişisel verileriniz;</Text>
                <Text style={s.paragraph}>•	Şirketimiz tarafından sunulan ürün ve hizmetlerden sizleri ve/veya temsil ettiğiniz kurum ve kuruluşları faydalandırmak için, Şirketimizin ticari ve iş stratejilerinin belirlenmesi ve uygulanması, pazarlama faaliyetlerinin yapılması, iş geliştirme ve planlama faaliyetlerinin gerçekleştirilmesi dahil ve fakat bunlarla sınırlı olmamak üzere gerekli çalışmaların yürütülmesi,</Text>
                <Text style={s.paragraph}>•	Şirketimiz tarafından yürütülen iletişime yönelik idari operasyonların yürütülmesi,</Text>
                <Text style={s.paragraph}>•	Şirketimizin kullanımda olan lokasyonların fiziksel güvenliğinin ve denetiminin sağlanması,</Text>
                <Text style={s.paragraph}>•	İş ortağı/müşteri/tedarikçi (yetkili veya çalışanları) ilişkilerinin kurulması,</Text>
                <Text style={s.paragraph}>•	İş ortaklarımız, tedarikçilerimiz veya sair üçüncü kişilerle birlikte sunulan ürün ve hizmetlere ilişkin sözleşme gereklerinin ve finansal mutabakatın sağlanması,</Text>
                <Text style={s.paragraph}>•	Şirketimizin insan kaynakları politikalarının yürütülmesi,</Text>
                <Text style={s.paragraph}>•	Şirketimizin çağrı merkezinin aranması veya internet sayfasının kullanılması ve/veya</Text>
                <Text style={s.paragraph}>•	Şirketimizin düzenlediği eğitim, seminer veya organizasyonlara katılım sağlanması amacıyla işlenecektir.</Text>
                <Text style={s.paragraph}>Kişisel verilerin toplanma ve saklanma yöntemi; Şirketimizle paylaştığınız kişisel verileriniz, otomatik ya da otomatik olmayan yöntemlerle, ofisler, şubeler, çağrı merkezi, internet sitesi, sosyal medya mecraları, mobil uygulamalar ve benzeri vasıtalarla sözlü, yazılı ya da elektronik olarak toplanabilir. Kişisel verileriniz elektronik ve/veya fiziksel ortamlarda saklanacaktır. Şirketimiz tarafından temin edilen ve saklanan kişisel verilerinizin saklandıkları ortamlarda yetkisiz erişime maruz kalmamaları, manipülasyona uğramamaları, kaybolmamaları ve zarar görmemeleri amacıyla gereken iş süreçlerinin tasarımı ile teknik güvenlik altyapı geliştirmeleri uygulanmaktadır.</Text>
                <Text style={s.paragraph}>Kişisel verileriniz, size bildirilen amaçlar ve kapsam dışında kullanılmamak kaydı ile gerekli tüm bilgi güvenliği tedbirleri de alınarak işlenecek ve yasal saklama süresince veya böyle bir süre öngörülmemişse işleme amacının gerekli kıldığı süre boyunca saklanacak ve işlenecektir. Bu süre sona erdiğinde, kişisel verileriniz silinme, yok edilme ya da anonimleştirme yöntemleri ile Şirketimizin veri akışlarından çıkarılacaktır.</Text>
                <Text style={s.subtitle}>Kişisel Verilerin aktarılması;</Text>
                <Text style={s.paragraph}>Kişisel verileriniz, Kanunlar ve sair mevzuat kapsamında ve açıklanan amaçlarla;</Text>
                <Text style={s.paragraph}>•	Türk Telekomünikasyon A.Ş. ve Türk Telekomünikasyon grup şirketlerine,</Text>
                <Text style={s.paragraph}>•	Yetki vermiş olduğumuz, Şirketimiz nam ve hesabına faaliyette bulunan şirketler, temsilcilerimize,</Text>
                <Text style={s.paragraph}>•	Düzenleyici ve denetleyici kurumlara, kişisel verilerinizi tabi olduğu kanunlarında açıkça talep etmeye yetkili olan kamu kurum veya kuruluşlara,</Text>
                <Text style={s.paragraph}>•	Belirtilen amaçlar kapsamında iş ortaklıkları, tedarikçi ve yüklenici şirketler, bankalar, kredi risk ve finans kuruluşları ve sair gerçek veya tüzel kişilere,</Text>
                <Text style={s.paragraph}>•	Vergi ve benzeri danışmanlara, yasal takip süreçleri ile ilgili zorunlu kişilere, kurum ve kuruluşlara ve denetimciler de dâhil olmak üzere danışmanlık aldığımız üçüncü kişilere ve bunlarla sınırlı olmaksızın, yurt içinde ve yurt dışında, yukarıda belirtilen amaçlarla iş ortakları, hizmet alınan üçüncü kişi, yetkilendirilen kişi ve kuruluşlara aktarılabilecektir.</Text>
                <Text style={s.subtitle}>KVKK’nın 11. maddesi gereği haklarınız;</Text>
                <Text style={s.paragraph}>Şirketimize başvurarak, kişisel verilerinizin;</Text>
                <Text style={s.paragraph}>1.	İşlenip işlenmediğini öğrenme,</Text>
                <Text style={s.paragraph}>2.	İşlenmişse bilgi talep etme,</Text>
                <Text style={s.paragraph}>3.	İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</Text>
                <Text style={s.paragraph}>4.	Yurt içinde / yurt dışında aktarıldığı 3. kişileri bilme,</Text>
                <Text style={s.paragraph}>5.	Eksik / yanlış işlenmişse düzeltilmesini isteme,</Text>
                <Text style={s.paragraph}>6.	KVKK’nın 7. maddesinde öngörülen şartlar çerçevesinde silinmesini / yok edilmesini isteme,</Text>
                <Text style={s.paragraph}>7.	Aktarıldığı 3. kişilere yukarıda sayılan (e) ve (f) bentleri uyarınca yapılan işlemlerin bildirilmesini isteme,</Text>
                <Text style={s.paragraph}>8.	Münhasıran otomatik sistemler ile analiz edilmesi nedeniyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,</Text>
                <Text style={s.paragraph}>9.	Kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme haklarına sahipsiniz.</Text>
                <Text style={s.paragraph}>KVK Kanunu’nun 13. maddesinin 1. fıkrası gereğince, yukarıda belirtilen haklarınızı kullanmak ile ilgili talebinizi, yazılı olarak veya Kişisel Verileri Koruma Kurulu’nun belirlediği diğer yöntemlerle Şirketimize iletebilirsiniz.</Text>
                <Text style={s.paragraph}>Yukarıda belirtilen haklarınızı kullanmak için kimliğinizi tespit edici gerekli bilgiler ile talep dilekçenizi bizzat elden teslim edebilir, noter kanalıyla veya Kişisel Verileri Koruma Kurulu tarafından belirlenen diğer yöntemler ile gönderebilir veya ………………….. adresine güvenli elektronik imzalı olarak iletebilirsiniz.</Text>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </>
    );
  }

}
const s = StyleSheet.create({
  termsText: {
    fontSize: res(9),
    color: '#41805c'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    backgroundColor: 'white',
    width: '80%',
    height: res(400),
    borderRadius: res(10),
    padding: res(10)
  },
  title: {
    fontWeight: 'bold',
    fontSize: res(14),
    width: '100%',
    textAlign: 'center',
    marginBottom: res(10)
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: res(12),
    marginBottom: res(10)
  },
  paragraph: {
    fontSize: res(12),
    marginBottom: res(10),
    textAlign: 'justify'
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: res(5)
  }
});
