import { useTrainingLogs } from '@src/store/zustand';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import TooltipUI from '@src/components/ui/Tooltip/TooltipUI';
import { Divider } from '@nextui-org/react';
import useTranslator from '@src/components/hooks/useTranslator';
import { useMyModelVoiceClassifier } from '@src/store/zustand';

function TrainingLogGraph() {
  const trainingLogs = useTrainingLogs((state) => state.logs);
  const modelParams = useMyModelVoiceClassifier((state) => state.modelParams);
  const { t } = useTranslator();

  if (trainingLogs.length === 0) return null;

  // epoch를 1부터 시작하도록 데이터 변환
  const adjustedLogs = trainingLogs.map((log) => ({
    ...log,
    epoch: log.epoch + 1,
  }));

  // 실제 학습된 데이터의 최대 epoch 값을 기준으로 X축 범위 설정
  const maxLoggedEpoch = Math.max(...adjustedLogs.map((log) => log.epoch));
  const totalEpoch = maxLoggedEpoch || modelParams.epoch || 50;
  const xTicks = Array.from({ length: 9 }, (_, i) =>
    Math.round(1 + ((totalEpoch - 1) * i) / 8),
  );

  return (
    <div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          data={adjustedLogs}
          margin={{
            top: 10,
            right: 20,
            left: -40,
            bottom: 0,
          }}
        >
          <CartesianGrid fill="white" />
          <XAxis
            type="number"
            dataKey="epoch"
            tick={{ fontSize: 12 }}
            ticks={xTicks}
            domain={[1, totalEpoch]}
            interval={0}
            allowDataOverflow={false}
          />
          <YAxis
            type="number"
            domain={[0, 1]}
            ticks={[0, 0.2, 0.4, 0.6, 0.8, 1]}
            width={65}
            tick={{ fontSize: 12 }}
            allowDataOverflow={true}
          />
          <Tooltip
            contentStyle={{
              borderRadius: '10px',
              background: 'white',
              fontSize: '13px',
            }}
          />
          <Line
            type="monotone"
            dataKey="acc"
            stroke="#1720F1"
            strokeWidth={1.3}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="val_acc"
            stroke="#F16617"
            strokeWidth={1.3}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="loss"
            stroke="#FFBB28"
            strokeWidth={1.3}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="val_loss"
            stroke="#00C49F"
            strokeWidth={1.3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="flex items-center justify-end gap-2">
        <TooltipUI
          placement="left"
          closeDelay={0}
          content={
            <div className="px-[25px] py-[29px] max-w-[396px]">
              <p className="p3-b mb-2">{t('TIP_TRAIN_ACC_TITLE')}</p>
              <p className="p5-r text-font-sub_1">{t('TIP_TRAIN_ACC_DESC')}</p>
              <Divider className="mt-[13px] mb-[20px]" />
              <p className="p3-b mb-2">{t('TIP_VALUE_ACC_TITLE')}</p>
              <p className="p5-r text-font-sub_1">{t('TIP_VALUE_ACC_DESC')}</p>
            </div>
          }
        >
          <img
            src="/assets/help.svg"
            alt="help"
            className="w-[18px] h-[18px] cursor-pointer"
          />
        </TooltipUI>
        <div className="flex items-center gap-[8px]">
          <div className="flex items-center gap-[4px]">
            <div className="w-[8px] h-[8px] rounded-full bg-[#1720F1]"></div>
            <span className="p6-r">acc</span>
          </div>
          <div className="flex items-center gap-[4px]">
            <div className="w-[8px] h-[8px] rounded-full bg-[#F16617]"></div>
            <span className="p6-r">val_acc</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainingLogGraph;
