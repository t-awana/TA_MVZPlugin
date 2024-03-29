//=============================================================================
// MSP_AllOffPatchMV.js
//=============================================================================
/*:
 * @plugindesc Reset all sounds setted by MultiSoundPlayer at shutting down of the game
 * @author Tamaki Awana
 * @help This plugin is a adding to reset all sounds at fade out
 * when moving to the title screen or loading save data
 * setted by RPG Maker MV plugin "MultiSoundPlayer"
 * (made by n2naokun(柊菜緒)).
 * You can use it just by installing this plugin
 * directly under "MultiSoundPlayer".
 * *This plugin alone cannot be used!
 *
 *
 * Plugin Commands:
 * This plugin does not provide plugin commands.
 * 
 * Update History:
 * ver.1.0.1 English supported
 * ver.1.0 Release
 *
 * ---
 * 
 * This plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 *
 */
/*:ja
 * @plugindesc MultiSoundPlayerで設定したサウンドを終了時などに一括で解除します。
 * @author 沫那環
 *
 *
 * @help n2naokun(柊菜緒)さん作
 * RPGツクールMVプラグイン素材「MultiSoundPlayer」に、
 * タイトル画面移行時やセーブデータのロード時の暗転に
 * 設定していたサウンドを一括解除する機能を追加します。
 * MultiSoundPlayer直下にこのプラグインを導入するだけで使えます。
 * ※このプラグイン単体では使えません！
 *
 *
 * 【プラグインコマンドについて】
 * このプラグインに、プラグインコマンドはありません。
 *
 * 【更新履歴】
 * ver.1.0.1 英語に対応
 * ver.1.0 公開
 *
 * ---
 *
 * このプラグインは MIT License にもとづいて提供されています。
 * https://opensource.org/licenses/mit-license.php
 *
 */
(() => {
  var _Scene_Base_fadeOutAll = Scene_Base.prototype.fadeOutAll;
  Scene_Base.prototype.fadeOutAll = function () {
    //ExSoundに収めている識別子全ての名前を、配列としてExSList作って突っ込む
    var exSoundIdList = Object.keys(ExSound);
    exSoundIdList.forEach((exSoundId) => deleteSound(exSoundId));
    //fadeOutAllの元の処理を呼び出す
    _Scene_Base_fadeOutAll.call(this);
  };

  //MV版MultiSoundPlayerからdeleteSoundの処理をコピー
  function deleteSound(soundId) {
    if (ExSoundBuffer[String(soundId)]) {
      // バッファ削除
      ExSoundBuffer[String(soundId)].stop();
      ExSoundBuffer[String(soundId)] = null;
      delete ExSoundBuffer[String(soundId)];
      // サウンド情報の削除
      ExSound[String(soundId)] = null;
      delete ExSound[String(soundId)];
      // サウンドタイプの削除
      ExSoundType[String(soundId)] = null;
      delete ExSoundType[String(soundId)];
   }
  }
})();
