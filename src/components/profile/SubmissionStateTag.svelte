<script lang="ts">
    import { SubmissionStateColorMap } from '../../utils/colors';
  
    let { state } = $props<{ state: string }>();
  </script>
  
  <div style:background-color={SubmissionStateColorMap[state] || SubmissionStateColorMap['DEFAULT']}>
      <span>{state}</span>
  </div>
  
  <style>
      div {
          padding: 3px 15px;
          width: fit-content;
          margin: 5px;
      }
      span {
          font-weight: bolder;
          font-size: 18px;
          color: #fff;
      }
  </style>
  