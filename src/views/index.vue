<template>
  <div>
    <el-container>
      <el-header>
        <h1>演示页面</h1>
      </el-header>

      <el-footer>
        <a href="/docs">查看文档</a>
        <a target="_blank" href="https://github.com/glide-the/RVC-Speakers">项目地址</a>
      </el-footer>
      <el-footer title="录音播放" :visible.sync="showAudioPlayer">
        <audio :src="src" autoplay="autoplay" controls="controls" ref="audio">
          Your browser does not support the audio element.
        </audio>
      </el-footer>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="3">

            <el-button  size="small" type="primary" @click="submitForm">提交</el-button>

          </el-col>
          <el-col :span="12">
            <el-radio-group v-model="formData.parameter.task_name" size="small">
              <el-radio-button label="vits_voice_task" ></el-radio-button>
              <el-radio-button label="edge_voice_task"></el-radio-button>
              <el-radio-button label="bark_voice_task" ></el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>

        <el-progress :percentage="progress" v-if="showProgressBar"></el-progress>
        <el-form ref="form" :model="formData" label-width="150px">
          <el-tabs tab-position="left">

            <el-tab-pane v-if="formData.parameter.task_name==='vits_voice_task'" label="VitsProcessorData Parameters">
              <!-- BarkProcessorData Parameters -->
              <el-form-item label="text">
                <el-tooltip content="生成文本" placement="top">
                  <el-input v-model="formData.payload.vits.text"></el-input>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="语言">
                <el-select  v-model="formData.payload.vits.language">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="speaker_id">
                <el-tooltip content="讲话人ID" placement="top">
                  <el-input v-model="formData.payload.vits.speaker_id"></el-input>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="noise_scale">

                <el-tooltip content="控制感情变化程度" placement="top">
                  <el-slider
                    v-model="formData.payload.vits.noise_scale"
                    :min="0.5"
                    :max="2"
                    :step="0.1"
                  ></el-slider>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="speed">

                <el-tooltip content="语速" placement="top">
                  <el-slider
                    v-model="formData.payload.vits.speed"
                    :min="0.5"
                    :max="2"
                    :step="0.5"
                  ></el-slider>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="noise_scale_w">

                <el-tooltip content="控制音素发音长度" placement="top">
                  <el-slider
                    v-model="formData.payload.vits.noise_scale_w"
                    :min="0"
                    :max="2"
                    :step="0.01"
                  ></el-slider>
                </el-tooltip>
              </el-form-item>

            </el-tab-pane>
            <el-tab-pane v-if="formData.parameter.task_name==='edge_voice_task'" label="EdgeProcessorData Parameters">
              <!-- BarkProcessorData Parameters -->
              <el-form-item label="text">
                <el-tooltip content="生成文本" placement="top">
                  <el-input v-model="formData.payload.edge.text"></el-input>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="tts_speaker">
                <el-tooltip content="讲话人id" placement="top">
                  <el-input v-model="formData.payload.edge.tts_speaker"></el-input>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="rate">

                <el-tooltip content="语速" placement="top">
                  <el-input v-model="formData.payload.edge.rate"></el-input>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="volume">

                <el-tooltip content="语气轻重" placement="top">
                  <el-input v-model="formData.payload.edge.volume"></el-input>
                </el-tooltip>
              </el-form-item>

            </el-tab-pane>
            <el-tab-pane v-if="formData.parameter.task_name==='bark_voice_task'" label="BarkProcessorData Parameters">
              <!-- BarkProcessorData Parameters -->
              <el-form-item label="text">
                <!-- 使用 el-tooltip 显示详细描述 -->
                <el-tooltip content="生成文本" placement="top">
                  <el-input v-model="formData.payload.bark.text"></el-input>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="speaker_history_prompt">

                <!-- 使用 el-tooltip 显示详细描述 -->
                <el-tooltip content="音频预设npz文件" placement="top">
                  <el-input v-model="formData.payload.bark.speaker_history_prompt"></el-input>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="text_temp">

                <el-tooltip content="提示特殊标记程序，趋近于1，提示词特殊标记越明显" placement="top">
                  <el-input v-model="formData.payload.bark.text_temp"></el-input>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="waveform_temp">

                <el-tooltip content="提示隐藏空间转音频参数比例" placement="top">
                  <el-input v-model="formData.payload.bark.waveform_temp"></el-input>
                </el-tooltip>
              </el-form-item>

            </el-tab-pane>
            <el-tab-pane label="RvcProcessorData Parameters">
              <el-form-item label=" (f0_up_key)">

                <el-tooltip content="变调" placement="top">
                  <el-input v-model="formData.payload.rvc.f0_up_key"></el-input>
                </el-tooltip>
              </el-form-item>
              <el-form-item label=" (f0_file, 可选)">
                <el-tooltip content="F0曲线文件" placement="top">
                  <el-input v-model="formData.payload.rvc.f0_file"></el-input>
                </el-tooltip>
              </el-form-item>
              <el-form-item label=" (protect)">
                <el-tooltip content="保护清辅音和呼吸声，防止电音撕裂等artifact，拉满0.5不开启，调低加大保护力度但可能降低索引效果" placement="top">
                  <el-input v-model="formData.payload.rvc.protect"></el-input>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="model_index">
                <el-tooltip content="模型索引" placement="top">
                  <el-input v-model="formData.payload.rvc.model_index"></el-input>
                </el-tooltip>
              </el-form-item>
              <el-form-item label=" (f0_method)">
                <el-tooltip content="F0方法" placement="top">
                  <el-input v-model="formData.payload.rvc.f0_method"></el-input>
                </el-tooltip>
              </el-form-item>
              <el-form-item label=" (index_rate)">
                <el-tooltip content="检索特征占比" placement="top">
                  <el-input v-model="formData.payload.rvc.index_rate"></el-input>
                </el-tooltip>
              </el-form-item>
              <el-form-item label=" (filter_radius)">
                <el-tooltip content="滤波半径" placement="top">
                  <el-input v-model="formData.payload.rvc.filter_radius"></el-input>
                </el-tooltip>
              </el-form-item>
              <el-form-item label=" (rms_mix_rate)">

                <el-tooltip content="输入源音量包络替换输出音量包络融合比例，越靠近1越使用输出包络" placement="top">
                  <el-input v-model="formData.payload.rvc.rms_mix_rate"></el-input>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="(resample_sr)">

                <el-tooltip content="后处理重采样至最终采样率，0为不进行重采样 " placement="top">
                  <el-input v-model="formData.payload.rvc.resample_sr"></el-input>
                </el-tooltip>
              </el-form-item>
            </el-tab-pane>
          </el-tabs>
        </el-form>

      </el-main>

    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import { runnerResult, runnerSubmit } from '@/api'

function smoothApproach(currentValue, targetValue, increment) {
  // 计算逼近的方向（增加还是减少）
  const direction = currentValue < targetValue ? 1 : -1;

  // 计算逼近的下一个值
  const nextValue = currentValue + direction * increment;

  // 如果下一个值超出了目标值，则将它设置为目标值
  if ((direction === 1 && nextValue > targetValue) || (direction === -1 && nextValue < targetValue)) {
    return targetValue;
  }

  return nextValue;
}
export default {
  data() {
    return {
      options: [
        { value: 0, label: '日本語' },
        { value: 1, label: '简体中文' },
        { value: 2, label: 'English' }
      ],
      formData: {

        created_at: 0,
        requested_at: 0,
        parameter: {
          task_name: 'vits_voice_task'
        },
        payload: {
          bark: {
            text: '青春的时间转瞬即逝，秋水于海又岂有一只浮游',
            speaker_history_prompt: 'zh_speaker_2',
            text_temp: 1,
            waveform_temp: 0.9
          },
          edge: {
            text: '青春的时间转瞬即逝，秋水于海又岂有一只浮游',
            tts_speaker: 55,
            rate: '-20%',
            volume: '+50%'
          },
          vits: {
            text: '青春的时间转瞬即逝，秋水于海又岂有一只浮游',
            language: 1,
            speaker_id: 486,
            noise_scale: 0.5,
            speed: 1,
            noise_scale_w: 1
          },
          rvc: {
            model_index: 0,
            f0_up_key: 5,
            f0_method: 'rmvpe',
            index_rate: 0.9,
            filter_radius: 1,
            rms_mix_rate: 1,
            resample_sr: 0,
            protect: 0.33,
            f0_file: ''
          }

        }
      },
      showProgressBar: false,
      progress: 0,
      showAudioPlayer: false,
      src: null
    };
  },
  methods: {
    async submitForm() {
      this.showProgressBar = true;
      this.progress = 0;

      const response = await runnerSubmit(this.formData);

      if(response.data.code === 200 && response.data.data.finished === true){
        this.progress = 100
        await this.getResultAndDisplayAudio(response.data.data.task_id);
      } else {
        await this.pollTaskStatus(response.data.data.task_id);
      }
    },
    async pollTaskStatus(taskId) {
      const intervalId = setInterval(async () => {
        this.progress = smoothApproach(this.progress, 100, 20);
        const response = await runnerSubmit(this.formData)
        if (response.data.code === 200 && response.data.data.finished === true) {
          clearInterval(intervalId);
          this.progress = 100
          await this.getResultAndDisplayAudio(taskId);
        }
      }, 5000);
    },
    async getResultAndDisplayAudio(taskId) {
      try {
        // 向服务器请求结果数据
        const response = await runnerResult({ task_id: taskId });

        // 检查响应是否成功
        this.showAudioPlayer = true;
        this.src = window.URL.createObjectURL(response.data)
        await this.$refs.audio.play();
      } catch (error) {
        console.error("获取结果时出错", error);
      }
    }
  },
};
</script>

<style scoped>
/* Add your custom CSS styles here */
</style>
